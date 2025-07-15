use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct MoogModule {
    cutoff: f32,
    resonance: f32,

    // Input and output
    in1: f32,
    in2: f32,
    in3: f32,
    in4: f32,
    out1: f32,
    out2: f32,
    out3: f32,
    out4: f32,
}

#[wasm_bindgen]
impl MoogModule {
    pub fn new(cutoff: f32, resonance: f32) -> MoogModule {
        MoogModule {
            cutoff,
            resonance,
            in1: 0.0,
            in2: 0.0,
            in3: 0.0,
            in4: 0.0,
            out1: 0.0,
            out2: 0.0,
            out3: 0.0,
            out4: 0.0,
        }
    }

    pub fn process(&mut self, samples: &js_sys::Float32Array) -> js_sys::Float32Array {
        let samples_vec: Vec<f32> = samples.to_vec();
        let output = self.process_vec(samples_vec);
        js_sys::Float32Array::from(&output[..])
    }

    pub fn process_vec(&mut self, mut samples: Vec<f32>) -> Vec<f32> {
        let f = (self.cutoff * 1.16).clamp(0.0, 0.99);
        let input_factor = 0.35013 * (f * f) * (f * f);
        let fb = (self.resonance * (1.0 - 0.15 * f * f)).clamp(0.0, 0.95);

        // Loop over samples and apply bitcrusher effect
        for sample in samples.iter_mut() {
            let mut base = *sample;
            base -= self.out4 * fb;
            base *= input_factor;

            // Add stability check
            // Was having an issue where it increments to infinity sometimes
            // if !base.is_finite() {
            //     base = 0.0;
            // }

            // Pole 1
            self.out1 = base + 0.3 * self.in1 + (1.0 - f) * self.out1;
            self.in1 = base;

            // Pole 2
            self.out2 = self.out1 + 0.3 * self.in2 + (1.0 - f) * self.out2;
            self.in2 = self.out1;

            // Pole 3
            self.out3 = self.out2 + 0.3 * self.in3 + (1.0 - f) * self.out3;
            self.in3 = self.out2;

            // Pole 4
            self.out4 = self.out3 + 0.3 * self.in4 + (1.0 - f) * self.out4;
            self.in4 = self.out3;

            *sample = self.out4.clamp(-1.0, 1.0);
        }

        samples
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_silence_input() {
        let mut filter = MoogModule::new(0.5, 0.5);
        // Generate silence samples
        let silence = vec![0.0; 128];
        
        // Run the filter process
        let result = filter.process_vec(silence);
        
        // Output should be close to zero for zero input
        for sample in result {
            assert!(sample.abs() < 0.001, "Sample too large: {}", sample);
        }
    }

    #[test]
    fn test_impulse_response() {
        let mut filter = MoogModule::new(0.5, 0.1);
        // Generate a single impulse sample
        let mut impulse = vec![0.0; 128];
        impulse[0] = 1.0;
        
        let output = filter.process_vec(impulse);
        
        // First sample should be non-zero
        assert!(output[0] != 0.0);
        // Should decay over time (lowpass behavior)
        assert!(output[10].abs() < output[0].abs());
    }

    #[test]
    fn test_no_nan_or_inf() {
        let mut filter = MoogModule::new(0.9, 0.9); // High settings
        // Generate sine wave samples
        let input_data: Vec<f32> = (0..128).map(|i| (i as f32 * 0.1).sin()).collect();
        
        let output = filter.process_vec(input_data);
        
        for (i, sample) in output.iter().enumerate() {
            assert!(sample.is_finite(), "Found NaN or Inf at index {}: {}", i, sample);
            assert!(sample.abs() < 10.0, "Output too large at index {}: {}", i, sample);
        }
    }

    #[test]
    fn test_stability_over_time() {
        let mut filter = MoogModule::new(0.7, 0.8);
        
        // Process many samples to test long-term stability
        // Ensures filter decays properly and doesn't go to infinity
        for _ in 0..10 {
            let input: Vec<f32> = (0..1024).map(|i| (i as f32 * 0.01).sin()).collect();
            let output = filter.process_vec(input);
            
            // Check last few samples are still reasonable
            for &sample in output.iter().rev().take(10) {
                assert!(sample.is_finite() && sample.abs() < 2.0);
            }
        }
    }
}