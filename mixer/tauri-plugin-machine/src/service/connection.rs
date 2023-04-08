use tauri::State;
use tokio_tungstenite::connect_async;

use crate::machine::{ConnectionStatus, MixerMachine};

use super::{CommandErr, CommandResult};

#[tauri::command]
pub async fn connect_to(url: String, state: State<'_, MixerMachine>) -> CommandResult<()> {
    println!("Connecting to {}", url);
    match connect_async(url).await {
        Ok((ws, _)) => match state.websocket.lock() {
            Ok(mut lock) => {
                lock.replace(ws);
                println!("Connected to websocket");
                Ok(())
            }
            Err(e) => {
                println!("Failed to accquire lock {:?}", e);
                Err(CommandErr::ConnectionErr(anyhow::anyhow!(
                    "Internal Err, failed to accquire lock {:?}",
                    e
                )))
            }
        },
        Err(e) => {
            println!("Failed to connect to websocket {:?}", e);
            Err(CommandErr::ConnectionErr(anyhow::anyhow!(
                "Failed to connect to websocket {:?}",
                e
            )))
        }
    }
}

#[tauri::command]
pub fn connection_status(state: State<'_, MixerMachine>) -> ConnectionStatus {
    state.status.clone()
}
