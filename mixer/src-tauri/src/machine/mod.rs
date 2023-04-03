
use std::sync::{Arc, Mutex};

use tokio::net::TcpStream;
use tokio_tungstenite::{connect_async, MaybeTlsStream, WebSocketStream};

use crate::proto::Track::Track;

pub struct MixerMachine {
    websocket: WebSocketStream<MaybeTlsStream<TcpStream>>,
    live_tracks: Vec<Track>,
}

impl MixerMachine {
    pub async fn connect_to(endpoint: &str) -> anyhow::Result<MixerMachine> {
        let (ws, _) = connect_async(url::Url::parse(endpoint)?).await?;
        Ok(MixerMachine {
            websocket: ws,
            live_tracks: vec![],
        })
    }
}
