#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use services::stream::stream_handler;

mod services;

fn main() {
  tauri::Builder::default()
    .register_uri_scheme_protocol("mixer", stream_handler)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
