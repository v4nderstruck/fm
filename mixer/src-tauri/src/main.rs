#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod machine;
mod proto;
mod services;

use std::sync::{Arc, Mutex};

use futures_util::StreamExt;
use services::stream::audio_stream_handler;
use tokio_tungstenite::connect_async;

#[tokio::main]
async fn main() {

    tauri::Builder::default()
        .plugin(mixer_machine::init())
        .invoke_handler(tauri::generate_handler![audio_stream_handler])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
