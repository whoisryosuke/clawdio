use plotters::coord::Shift;
#[cfg(feature = "viz")]
use plotters::prelude::*;
use std::path::Path;
use std::fs;

const SNAPSHOT_FOLDER_PATH: &'static str = "tests/__snapshots__";

fn generate_snapshot_file(snapshot_path: &Path, title: &str) -> String {
    let mut filename = title.to_lowercase().replace(" ", "_");
    filename.push_str(".png");
    let filepath = snapshot_path.join(filename);
    let filepath_string = filepath.to_str().unwrap();

    String::from(filepath_string)
}

fn create_canvas(filepath_string: &str) -> DrawingArea<plotters::prelude::BitMapBackend<'_>, Shift> {
    let root = BitMapBackend::new(filepath_string, (800, 600)).into_drawing_area();
    root.fill(&BLACK).expect("Couldn't create canvas");

    root
}

pub fn create_title_font() -> TextStyle<'static> {
use plotters::style::full_palette::{GREY_400};
    ("sans-serif", 40).into_font().color(&GREY_400)
}

pub fn create_label_font() -> TextStyle<'static> {
use plotters::style::full_palette::{GREY_400};
    ("sans-serif", 20).into_font().color(&GREY_400)
}

// Plotting function
#[cfg(feature = "viz")]
pub fn plot_waveform(
    samples: &[f32],

    sample_rate: f32,
    title: &str,
) -> Result<(), Box<dyn std::error::Error>> {

    // Create snapshots directory in local folder

use plotters::style::full_palette::{GREY_600, GREY_800, GREY_900};

    let snapshot_path = Path::new(SNAPSHOT_FOLDER_PATH);
    if !&snapshot_path.exists() {
        println!("no folder found");

        fs::create_dir(SNAPSHOT_FOLDER_PATH)?;
    }

    // Append filename to the snapshot folder
    let filepath_string = generate_snapshot_file(snapshot_path, title);

    // Create the backend for drawing
    let root = create_canvas(&filepath_string);

    // Map samples to a linear graph where horizontal is time (aka duration)
    let duration = samples.len() as f64 / sample_rate as f64;
    let time_points: Vec<(f64, f64)> = samples
        .iter()
        .enumerate()
        .map(|(i, &sample)| (i as f64 / sample_rate as f64, sample as f64))
        .collect();

    // Build the chart
    let font = create_title_font();
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


#[cfg(feature = "viz")]
pub fn plot_waveform_comparison(
    samples: &[f32],
    samples_compare: &[f32],

    sample_rate: f32,
    title: &str,
) -> Result<(), Box<dyn std::error::Error>> {

    // Create snapshots directory in local folder

use plotters::style::full_palette::{PURPLE, GREY_600, GREY_800, GREY_900};

    let snapshot_path = Path::new(SNAPSHOT_FOLDER_PATH);
    if !&snapshot_path.exists() {
        println!("no folder found");

        fs::create_dir(SNAPSHOT_FOLDER_PATH)?;
    }

    // Append filename to the snapshot folder
    let filepath_string = generate_snapshot_file(snapshot_path, title);

    // Create the backend for drawing
    let root = create_canvas(&filepath_string);

    // Map samples to a linear graph where horizontal is time (aka duration)
    let duration = samples.len() as f64 / sample_rate as f64;
    let time_points: Vec<(f64, f64)> = samples
        .iter()
        .enumerate()
        .map(|(i, &sample)| (i as f64 / sample_rate as f64, sample as f64))
        .collect();

    let compare_points: Vec<(f64, f64)> = samples_compare
        .iter()
        .enumerate()
        .map(|(i, &sample)| (i as f64 / sample_rate as f64, sample as f64))
        .collect();

    // Build the chart
    let font = create_title_font();
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

    // Plot points on graph/chart + add labels
    chart.draw_series(LineSeries::new(time_points, &BLUE))?.label("Effect")
        .legend(|(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &BLUE));
    chart.draw_series(LineSeries::new(compare_points, &PURPLE))?.label("Comparison")
        .legend(|(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &PURPLE));

    // Draw the legend with labels
    let font = create_label_font();
    chart
        .configure_series_labels()
        .background_style(&GREY_900)
        .label_font(font)
        .border_style(&GREY_600)
        .position(SeriesLabelPosition::LowerRight)
        .draw()?;

    root.present()?;
    Ok(())
}