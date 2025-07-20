#[cfg(feature = "viz")]
use plotters::prelude::*;
use std::path::Path;
use std::fs;

const SNAPSHOT_FOLDER_PATH: &'static str = "tests/__snapshots__";

// Plotting function
#[cfg(feature = "viz")]
pub fn plot_waveform(
    samples: &[f32],

    sample_rate: f32,
    filename: &str,
    title: &str,
) -> Result<(), Box<dyn std::error::Error>> {

    // Create snapshots directory in local folder

use plotters::style::full_palette::{GREY_600, GREY_400, GREY_800, GREY_900};

    let snapshot_path = Path::new(SNAPSHOT_FOLDER_PATH);
    if !&snapshot_path.exists() {
        println!("no folder found");

        fs::create_dir(SNAPSHOT_FOLDER_PATH)?;
    }

    // Append filename to the snapshot folder
    let filepath = snapshot_path.clone().join(filename);
    let filepath_string = filepath.to_str().unwrap();

    // Create the backend for drawing
    let root = BitMapBackend::new(filepath_string, (800, 600)).into_drawing_area();
    root.fill(&BLACK)?;

    // Map samples to a linear graph where horizontal is time (aka duration)
    let duration = samples.len() as f64 / sample_rate as f64;
    let time_points: Vec<(f64, f64)> = samples
        .iter()
        .enumerate()
        .map(|(i, &sample)| (i as f64 / sample_rate as f64, sample as f64))
        .collect();

    // Build the chart
    let font = ("sans-serif", 40).into_font().color(&GREY_400);
    let mut chart = ChartBuilder::on(&root)
        .caption(title, font)
        .margin(20)
        .x_label_area_size(40)
        .y_label_area_size(40)
        .build_cartesian_2d(0.0..duration, -1.5..1.5)?;

    chart
        .configure_mesh()
        .light_line_style(&GREY_900)
        .bold_line_style(&GREY_800)
        .x_desc("Time (s)")
        .y_desc("Amplitude")
        .axis_style(&WHITE)
        .label_style(&GREY_600)
        .draw()?;

    // Plot points on graph/chart
    chart.draw_series(LineSeries::new(time_points, &BLUE))?;

    root.present()?;
    Ok(())
}