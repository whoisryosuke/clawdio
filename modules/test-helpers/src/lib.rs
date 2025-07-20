#[cfg(any(test, feature = "viz"))]
pub mod plotting;

pub fn generate_silence_samples() -> Vec<f32> {
    vec![0.0; 128]
}

// Re-export for convenience (optional)
#[cfg(any(test, feature = "viz"))]
pub use plotting::*;