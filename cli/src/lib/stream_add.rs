use super::{Executable, StreamAddArgs};

impl Executable for &StreamAddArgs {
    fn run(&self) -> anyhow::Result<()> {
        println!("stream add {:#?}", self);
        Ok(())
    }
}
