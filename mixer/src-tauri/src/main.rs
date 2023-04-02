#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod services;
use services::stream::audio_stream_handler;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![audio_stream_handler])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
