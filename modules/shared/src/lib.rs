pub struct SimpleRng {
    state: u64,
}

impl SimpleRng {
    pub fn new(seed: u64) -> Self {
        Self { state: seed }
    }
    
    pub fn random(&mut self) -> f32 {
        // Simple LCG constants
        self.state = self.state.wrapping_mul(1103515245).wrapping_add(12345);
        // Convert to float between -1 and 1
        let normalized = (self.state as f32) / (u64::MAX as f32);
        normalized * 2.0 - 1.0
    }
}