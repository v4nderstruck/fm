use anyhow::bail;

use super::{Cli, ControlCmd, Executable, StreamCmd};

impl Cli {
    pub fn exec(&self) -> anyhow::Result<()> {
        match &self.command {
            Some(cmd) => match cmd {
                ControlCmd::Stream(stream_args) => match &stream_args.command {
                    Some(stream_cmd) => match stream_cmd {
                        StreamCmd::Add(stream_add_args) => stream_add_args.run(),
                    },
                    None => bail!("No command specified"),
                },
            },
            None => bail!("No command specified"),
        }
    }
}
