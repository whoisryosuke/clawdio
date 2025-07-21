pub fn generate_sine_wave(num_samples: i32) -> Vec<f32> {
    let input: Vec<f32> = (0..num_samples).map(|i| (i as f32 * 0.01).sin()).collect();

    input
}