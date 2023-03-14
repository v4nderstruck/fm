pub mod stream_add;
pub mod cli;

use anyhow::Result;
use clap::{command, Args, Parser, Subcommand};

pub trait Executable {
    fn run(&self) -> Result<()>;
}

#[derive(Parser, Debug)]
#[command(arg_required_else_help = true)]
pub struct Cli {
    /// controls log verbosity
    #[arg(short, long, default_value = "0")]
    verbose: u8,

    #[command(subcommand)]
    command: Option<ControlCmd>,
}

#[derive(Subcommand, Debug)]
#[command(arg_required_else_help = true)]
pub enum ControlCmd {
    /// control stream
    Stream(StreamArgs),
}

#[derive(Debug, Args)]
pub struct StreamArgs {
    #[command(subcommand)]
    command: Option<StreamCmd>,
}

#[derive(Debug, Subcommand)]
#[command(arg_required_else_help = true)]
pub enum StreamCmd {
    /// add new title to stream
    Add(StreamAddArgs),
}

#[derive(Debug, Args)]
pub struct StreamAddArgs {
    /// stream id to add the changes to
    stream_id: String,
    /// item_id e.g. a YT video id
    item_id: String,
    /// artists to be displayed
    artists: String,
    /// item title to be displayed
    title: String,
}
