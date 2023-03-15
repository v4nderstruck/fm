use anyhow::bail;

use crate::connection::Connection;

use super::{Cli, ControlCmd, Executable, StreamCmd};
use protobuf::Message;
use tokio_tungstenite::tungstenite::protocol::Message as WSMessage;

impl Cli {
    /// consumes the cli
    pub async fn exec(self, connection: &mut Connection) -> anyhow::Result<()> {
        Ok(match self.command {
            Some(cmd) => match cmd {
                ControlCmd::Stream(stream_args) => match stream_args.command {
                    Some(stream_cmd) => match stream_cmd {
                        StreamCmd::Add(stream_add_args) => {
                            let mut vec = vec![];
                            stream_add_args.parse()?.write_to_vec(&mut vec)?;
                            connection.sendMesage(WSMessage::Binary(vec)).await?
                        }
                    },
                    None => bail!("No command specified"),
                },
            },
            None => bail!("No command specified"),
        })
    }
}
