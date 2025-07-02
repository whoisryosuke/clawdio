use wasm_bindgen::prelude::*;
// use web_sys::{console};


#[wasm_bindgen]
pub struct BitcrusherModule {
    bits: usize,
    phaser: f32,
    last: f32,
}

#[wasm_bindgen]
impl BitcrusherModule {
    pub fn new(bits: usize) -> BitcrusherModule {
        BitcrusherModule { bits, phaser: 0.0, last: 0.0 }
    }

    pub fn process(&mut self, samples: &js_sys::Float32Array, normfreq: f32) -> js_sys::Float32Array {

        // console::log_1(&"Processing in Rust".into());

        let samples_vec: Vec<f32> = samples.to_vec();
        let mut output = samples_vec; 
        
        let step = 0.5_f32.powf(self.bits as f32);

        // Loop over samples and apply bitcrusher effect
        for sample in output.iter_mut() {
            self.phaser += normfreq;
            if self.phaser >= 1.0 {
                self.phaser -= 1.0;
                self.last = step * (*sample / step + 0.5).floor(); 
            }
            *sample = self.last.clone();
        }

        js_sys::Float32Array::from(&output[..])
    }
}

// Don't forget to add this for panic handling
// #[wasm_bindgen(start)]
// pub fn main() {
//     console_error_panic_hook::set_once();
// }