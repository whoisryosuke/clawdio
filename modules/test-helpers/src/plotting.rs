#[cfg(feature = "viz")]
use plotters::prelude::*;

// Plotting function
#[cfg(feature = "viz")]
pub fn plot_waveform(
    samples: &[f32],

    sample_rate: f32,
    filename: &str,
    title: &str,
) -> Result<(), Box<dyn std::error::Error>> {

    let root = BitMapBackend::new(filename, (800, 600)).into_drawing_area();
    root.fill(&WHITE)?;

    let duration = samples.len() as f64 / sample_rate as f64;
    let time_points: Vec<(f64, f64)> = samples
        .iter()
        .enumerate()
        .map(|(i, &sample)| (i as f64 / sample_rate as f64, sample as f64))
        .collect();

    let mut chart = ChartBuilder::on(&root)
        .caption(title, ("sans-serif", 40).into_font())
        .margin(20)
        .x_label_area_size(40)
        .y_label_area_size(40)
        .build_cartesian_2d(0.0..duration, -1.5..1.5)?;

    chart
        .configure_mesh()
        .x_desc("Time (s)")
        .y_desc("Amplitude")
        .draw()?;

    chart.draw_series(LineSeries::new(time_points, &BLUE))?;

    root.present()?;
    Ok(())
}