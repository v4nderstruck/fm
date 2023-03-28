use std::{error::Error, process::Command, str::FromStr};

use anyhow::bail;
use tauri::{
    http::{Request, Response, ResponseBuilder, Uri},
    AppHandle, Runtime,
};

/// currently using yt-dlp
fn get_audio_internal(id: &str) -> anyhow::Result<Vec<u8>> {
    let cmd = Command::new("yt-dlp")
        .arg(id)
        .arg("-q")
        .arg("-x")
        .arg("--audio-format")
        .arg("mp3")
        .arg("-o")
        .arg("-")
        .output()?;
    Ok(cmd.stdout)
}

fn get_stream_id(uri: &str) -> anyhow::Result<String> {
    if let Some(path) = uri.strip_prefix("mixer://localhost/") {
        if let Some(id) = path.split('/').next() {
            return Ok(String::from(id));
        } else {
            bail!("invalid uri: {}", uri)
        }
    } else {
        bail!("invalid uri: {}", uri)
    }
}

pub fn stream_handler<R: Runtime>(
    _app_handle: &AppHandle<R>,
    req: &Request,
) -> Result<Response, Box<dyn Error>> {
    println!("uri: {}", req.uri());
    let track_id = get_stream_id(req.uri())?;
    println!("track_id: {}", track_id);
    let audio = get_audio_internal(&track_id)?;
    let response = ResponseBuilder::new();
    Ok(response
        .header("Access-Control-Allow-Origin", "*")
        .mimetype("audio/mp3")
        .status(200)
        .body(audio)?)
}
