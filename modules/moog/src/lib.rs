use wasm_bindgen::prelude::*;
// use web_sys::{console};


#[wasm_bindgen]
pub struct MoogModule {
    cutoff: f32,
    resonance: f32,
}

#[wasm_bindgen]
impl MoogModule {
    pub fn new(cutoff: f32, resonance: f32) -> MoogModule {
        MoogModule { cutoff, resonance }
    }

    pub fn process(&mut self, samples: &js_sys::Float32Array) -> js_sys::Float32Array {

        let samples_vec: Vec<f32> = samples.to_vec();
        let mut output = samples_vec; 
        
        let mut in1 = 0.0;
        let mut in2 = 0.0;
        let mut in3 = 0.0;
        let mut in4 = 0.0;
        let mut out1 = 0.0;
        let mut out2 = 0.0;
        let mut out3 = 0.0;
        let mut out4 = 0.0;

        let f = self.cutoff * 1.16;
        let input_factor = 0.35013 * (f * f) * (f * f);
        let fb = self.resonance * (1.0 - 0.15 * f * f);

        // Loop over samples and apply bitcrusher effect
        for sample in output.iter_mut() {
            let mut base = *sample;
            base -= out4 * fb;
            base *= input_factor;

            // Pole 1
            out1 = base + 0.3 * in1 + (1.0 - f) * out1;
            in1 = base;

            // Pole 2
            out2 = out1 + 0.3 * in2 + (1.0-f) * out2;
            in2 = out1;

            // Pole 3
            out3 = out2 + 0.3 * in3 + (1.0-f) * out3;
            in3 = out2;

            // Pole 4
            out4 = out3 + 0.3 * in4 + (1.0-f) * out4;
            in4 = out3;

            *sample = out4;
        }

        js_sys::Float32Array::from(&output[..])
    }
}

// Don't forget to add this for panic handling
// #[wasm_bindgen(start)]
// pub fn main() {
//     console_error_panic_hook::set_once();
// }