use std::{ops::DerefMut, sync::Mutex};

use anyhow::{bail};
use serde::{Serialize, Deserialize};
use tauri::State;
use tokio::net::TcpStream;
use tokio_tungstenite::{connect_async, MaybeTlsStream, WebSocketStream};

#[derive(Serialize, Deserialize, Clone)]
pub enum ConnectionStatus {
    Connected(String),
    Disconnected,
}

#[derive(Serialize, Deserialize)]
pub struct MixerMachine {
    pub status: ConnectionStatus,
    #[serde(skip_serializing, skip_deserializing)]
    pub websocket: Mutex<Option<WebSocketStream<MaybeTlsStream<TcpStream>>>>,
}

impl MixerMachine {
    pub fn init() -> MixerMachine {
        MixerMachine {
            status: ConnectionStatus::Disconnected,
            websocket: Mutex::new(None),
        }
    }

    pub async fn connect_to(&mut self, url: &str) -> anyhow::Result<()> {
        let (websocket, _) = connect_async(url).await?;
        match self.websocket.lock() {
            Ok(mut lock) => lock.replace(websocket),
            Err(e) => bail!("Failed to lock state: {:#?}", e),
        };
        Ok(())
    }

    pub async fn disconnect(state: State<'_, MixerMachine>) -> anyhow::Result<()> {
        match state.websocket.lock() {
            Ok(mut lock) => {
                if let Some(ws) = lock.deref_mut() {
                    ws.close(None).await?;
                    *lock = None;
                    return Ok(());
                };
                Ok(())
            }
            Err(e) => bail!("Failed to lock state: {:#?}", e),
        }
    }
}
