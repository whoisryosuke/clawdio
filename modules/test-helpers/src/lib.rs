pub mod signal;
#[cfg(any(test, feature = "viz"))]
pub mod plotting;

pub fn generate_silence_samples() -> Vec<f32> {
    vec![0.0; 128]
}
