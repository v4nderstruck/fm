use futures_util::{SinkExt, StreamExt};
use tokio::{
    net::TcpStream,
    sync::mpsc::{UnboundedReceiver, UnboundedSender},
};
use tokio_tungstenite::{connect_async, tungstenite::Message, MaybeTlsStream, WebSocketStream};

pub struct Connection {
    channel_receiver: UnboundedReceiver<Message>,
    channel_sender: UnboundedSender<Message>,
    websocket: WebSocketStream<MaybeTlsStream<TcpStream>>,
}

impl Connection {
    pub async fn new() -> anyhow::Result<Self> {
        let (channel_sender, channel_receiver) = tokio::sync::mpsc::unbounded_channel();
        let (websocket, _) = connect_async(url::Url::parse("ws://localhost:8001/control")?).await?;
        Ok(Self {
            channel_receiver,
            channel_sender,
            websocket,
        })
    }

    pub async fn sendMesage(&mut self, msg: Message) -> anyhow::Result<()> {
        Ok(self.websocket.send(msg).await?)
    }
}
