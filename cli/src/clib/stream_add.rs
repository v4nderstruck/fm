use protobuf::{EnumOrUnknown, MessageField};

use crate::proto::{
    Control::{ControlMessage, StreamT},
    Stream::{StreamAction, StreamJoin},
};

use super::{Executable, StreamAddArgs};

impl Executable<ControlMessage> for StreamAddArgs {
    fn parse(self) -> anyhow::Result<ControlMessage> {
        println!("stream add {:#?}", self);
        let mut stream_join = StreamJoin::new();
        stream_join.streamId = self.stream_id;

        let mut stream_t = StreamT::new();
        stream_t.title = self.title;
        stream_t.description = self.artists;
        stream_t.videoId = self.item_id;
        stream_t.action = EnumOrUnknown::new(StreamAction::ADD);

        let mut control_msg = ControlMessage::new();
        control_msg.id = MessageField::some(stream_join);
        control_msg.set_stream(stream_t);

        Ok(control_msg)
    }
}
