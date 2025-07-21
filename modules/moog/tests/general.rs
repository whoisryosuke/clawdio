use clawdio_moog::MoogModule;
use test_helpers::{generate_silence_samples, signal::generate_sine_wave, plotting::plot_waveform_comparison};

#[test]
fn test_silence_input() {
    let mut filter = MoogModule::new(0.5, 0.5);
    // Generate silence samples
    let silence = generate_silence_samples();
    
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
fn test_signal_effect() {
    let num_samples = 1024;
    let mut filter = MoogModule::new(0.7, 0.8);
    let original = generate_sine_wave(num_samples);
    let input = generate_sine_wave(num_samples);
    let output = filter.process_vec(input);

    // Visualize signal
    plot_waveform_comparison(
        &output,
        &original,
        num_samples as f32,
        "Moog Test - Sine Wave",
    )
    .expect("Failed to create plot");
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