use clawdio_bitcrusher::BitcrusherModule;
use test_helpers::{signal::generate_sine_wave, plotting::plot_waveform_comparison};

#[test]
fn test_signal_effect() {
    let num_samples = 1024;
    let mut filter = BitcrusherModule::new(4);
    let original = generate_sine_wave(num_samples);
    let input = generate_sine_wave(num_samples);
    let output = filter.process_vec(input, 0.420);

    // Bitcrusher creates a step-like pattern out of input signal
    // Technically the modified signal will be equal sometimes, but mostly not
    // So we check that (mostly) every point in signal is different
    let mut is_equal = 0;
    let mut is_diff = 0;
    for index in 0..original.len() {
        let sample_original = original[index];
        let sample_effect = output[index];

        if sample_original != sample_effect {
            is_diff += 1;
        } else {
            is_equal += 1;
        }
    }
    assert!(is_diff > is_equal, "Values should be less equal");


    // Visualize signal
    plot_waveform_comparison(
        &output,
        &original,
        num_samples as f32,
        "Bitcrusher Test - Comparison (Sine)",
    )
    .expect("Failed to create plot");
}