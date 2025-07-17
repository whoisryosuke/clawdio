use clawdio_shared::SimpleRng;

/**
 * Check if numbers are actually random
 */
#[test]
fn test_simple_random() {
    let mut rng = SimpleRng::new(0);
    
    // Run the filter process
    let random_one = rng.random();
    let random_two = rng.random();

    assert!(random_one != random_two, "Numbers should not be equal");
}