use wasm_bindgen::prelude::*;
use shared::SimpleRng;

#[wasm_bindgen]
pub struct PinkNoiseModule {
    rng: SimpleRng,
    buffer_size: i32,

    // Input and output
    b0: f32,
    b1: f32,
    b2: f32,
    b3: f32,
    b4: f32,
    b5: f32,
    b6: f32,
}

#[wasm_bindgen]
impl PinkNoiseModule {
    pub fn new(buffer_size: i32) -> PinkNoiseModule {
        PinkNoiseModule {
            rng: SimpleRng::new(0),
            buffer_size,
            b0: 0.0,
            b1: 0.0,
            b2: 0.0,
            b3: 0.0,
            b4: 0.0,
            b5: 0.0,
            b6: 0.0,
        }
    }

    pub fn process(&mut self) -> js_sys::Float32Array {
        let output = self.process_vec();
        js_sys::Float32Array::from(&output[..])
    }

    pub fn process_vec(&mut self) -> Vec<f32> {
        let mut samples: Vec<f32> = Vec::new();
        for _ in 0..self.buffer_size {
            let white_noise: f32 = self.rng.random();
            self.b0 = 0.99886 * self.b0 + white_noise * 0.0555179;
            self.b1 = 0.99332 * self.b1 + white_noise * 0.0750759;
            self.b2 = 0.96900 * self.b2 + white_noise * 0.1538520;
            self.b3 = 0.86650 * self.b3 + white_noise * 0.3104856;
            self.b4 = 0.55000 * self.b4 + white_noise * 0.5329522;
            self.b5 = -0.7616 * self.b5 - white_noise * 0.0168980;
            let mut pink_noise = self.b0
                + self.b1
                + self.b2
                + self.b3
                + self.b4
                + self.b5
                + self.b6
                + white_noise * 0.5362;
            pink_noise *= 0.11;
            samples.push(pink_noise);
            self.b6 = white_noise * 0.115926;
        }

        samples
    }
}
