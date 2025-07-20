use clawdio_pink_noise::PinkNoiseModule;
use test_helpers::plotting::plot_waveform;

const NUM_SAMPLES: i32 = 4096;

/**
 * Check if signal is created
 */
#[test]
fn test_signal() {
    let mut filter = PinkNoiseModule::new(NUM_SAMPLES);

    // Run the filter process
    let result = filter.process_vec();

    // Output should be close to zero for zero input
    for sample in &result {
        assert!(sample.abs() != 0.0, "Shouldn't be zero: {}", sample);
    }

    // Visualize signal
    plot_waveform(
        &result,
        (NUM_SAMPLES as f32),
        "pink_noise_test.png",
        "Pink Noise Test",
    )
    .expect("Failed to create sine wave plot");
}

/**
 * Check signal length
 */
#[test]
fn test_buffer_size() {
    let mut filter = PinkNoiseModule::new(4096);

    // Run the filter process
    let result = filter.process_vec();

    let array_size = result.len();
    assert!(
        array_size == 4096,
        "Not enough samples generated: {}",
        array_size
    );
}

/**
 * Check if noise exceeds -1 to 1 range.
 */
#[test]
fn test_threshold() {
    let mut filter = PinkNoiseModule::new(4096);

    // Run the filter process
    let result = filter.process_vec();

    // Output should be close to zero for zero input
    for sample in result {
        assert!(
            sample.abs() < 1.0,
            "Shouldn't be greater than -1 to 1 range: {}",
            sample.abs()
        );
    }
}

/**
 * Check if noise is different
 */
#[test]
fn test_randomness() {
    let mut filter = PinkNoiseModule::new(4096);

    // Run the filter process
    let result = filter.process_vec();

    assert!(result[0] != result[1], "Numbers should be different");
}
