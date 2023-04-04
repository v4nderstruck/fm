use anyhow::bail;
use tauri::{AppHandle, Runtime, State};
use tokio_tungstenite::connect_async;

use crate::machine::MixerMachine;

#[tauri::command]
pub async fn connect_to<R: Runtime>(
    url: String,
    state: State<'_, MixerMachine>,
) -> anyhow::Result<()> {
    Ok(MixerMachine::connect_to(state, &url).await?)
}
