use async_process::Command;

/// currently using yt-dlp
async fn get_audio_internal(id: &str) -> anyhow::Result<Vec<u8>> {
    let cmd = Command::new("yt-dlp")
        .arg(id)
        .arg("-q")
        .arg("-x")
        .arg("--audio-format")
        .arg("mp3")
        .arg("-o")
        .arg("-")
        .output()
        .await?;
    Ok(cmd.stdout)
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct HandlerResults {
    value: Option<Vec<u8>>,
}

#[tauri::command]
pub async fn audio_stream_handler(id: String) -> HandlerResults {
    println!("{}: requested", id);
    match get_audio_internal(&id).await {
        Ok(audio) => HandlerResults{ value: Some(audio) },
        Err(e) => HandlerResults{ value: None },
    }
}
