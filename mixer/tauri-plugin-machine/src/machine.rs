use std::{sync::Mutex, ops::DerefMut};

use anyhow::{bail, Context};
use tauri::State;
use tokio::net::TcpStream;
use tokio_tungstenite::{connect_async, MaybeTlsStream, WebSocketStream};

pub struct MixerMachine {
    pub websocket: Mutex<Option<WebSocketStream<MaybeTlsStream<TcpStream>>>>,
}

impl MixerMachine {
    pub fn init() -> MixerMachine {
        MixerMachine {
            websocket: Mutex::new(None),
        }
    }

    pub async fn connect_to(state: State<'_, MixerMachine>, url: &str) -> anyhow::Result<()> {
        let (websocket, _) = connect_async(url).await?;
        match state.websocket.lock() {
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
                    return Ok(())
                };
                Ok(())
            }
            Err(e) => bail!("Failed to lock state: {:#?}", e),
        }
    }
}
