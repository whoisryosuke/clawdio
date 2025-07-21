use clawdio_bitcrusher::BitcrusherModule;
use test_helpers::{signal::generate_sine_wave, plotting::plot_waveform_comparison};

#[test]
fn test_signal_effect() {
    let num_samples = 1024;
    let mut filter = BitcrusherModule::new(4);
    let original = generate_sine_wave(num_samples);
    let input = generate_sine_wave(num_samples);
    let output = filter.process_vec(input, 0.420);

    // Visualize signal
    plot_waveform_comparison(
        &output,
        &original,
        num_samples as f32,
        "Bitcrusher Test - Comparison (Sine)",
    )
    .expect("Failed to create plot");
}