// This file is generated by rust-protobuf 3.2.0. Do not edit
// .proto file is parsed by protoc --rust-out=...
// @generated

// https://github.com/rust-lang/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy::all)]

#![allow(unused_attributes)]
#![cfg_attr(rustfmt, rustfmt::skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unused_results)]
#![allow(unused_mut)]

//! Generated file from `protocol/Track.proto`

/// Generated files are compatible only with the same version
/// of protobuf runtime.
const _PROTOBUF_VERSION_CHECK: () = ::protobuf::VERSION_3_2_0;

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:zensayyy.fm.proto.Track)
pub struct Track {
    // message fields
    // @@protoc_insertion_point(field:zensayyy.fm.proto.Track.trackEvents)
    pub trackEvents: ::std::vec::Vec<TrackTimeEvent>,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.Track.tracks)
    pub tracks: ::std::vec::Vec<TrackMetadata>,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.Track.time)
    pub time: ::protobuf::MessageField<::protobuf::well_known_types::timestamp::Timestamp>,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.Track.id)
    pub id: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:zensayyy.fm.proto.Track.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a Track {
    fn default() -> &'a Track {
        <Track as ::protobuf::Message>::default_instance()
    }
}

impl Track {
    pub fn new() -> Track {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(4);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_vec_simpler_accessor::<_, _>(
            "trackEvents",
            |m: &Track| { &m.trackEvents },
            |m: &mut Track| { &mut m.trackEvents },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_vec_simpler_accessor::<_, _>(
            "tracks",
            |m: &Track| { &m.tracks },
            |m: &mut Track| { &mut m.tracks },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_message_field_accessor::<_, ::protobuf::well_known_types::timestamp::Timestamp>(
            "time",
            |m: &Track| { &m.time },
            |m: &mut Track| { &mut m.time },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "id",
            |m: &Track| { &m.id },
            |m: &mut Track| { &mut m.id },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<Track>(
            "Track",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for Track {
    const NAME: &'static str = "Track";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.trackEvents.push(is.read_message()?);
                },
                18 => {
                    self.tracks.push(is.read_message()?);
                },
                26 => {
                    ::protobuf::rt::read_singular_message_into_field(is, &mut self.time)?;
                },
                34 => {
                    self.id = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        for value in &self.trackEvents {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint64_size(len) + len;
        };
        for value in &self.tracks {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint64_size(len) + len;
        };
        if let Some(v) = self.time.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint64_size(len) + len;
        }
        if !self.id.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.id);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        for v in &self.trackEvents {
            ::protobuf::rt::write_message_field_with_cached_size(1, v, os)?;
        };
        for v in &self.tracks {
            ::protobuf::rt::write_message_field_with_cached_size(2, v, os)?;
        };
        if let Some(v) = self.time.as_ref() {
            ::protobuf::rt::write_message_field_with_cached_size(3, v, os)?;
        }
        if !self.id.is_empty() {
            os.write_string(4, &self.id)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> Track {
        Track::new()
    }

    fn clear(&mut self) {
        self.trackEvents.clear();
        self.tracks.clear();
        self.time.clear();
        self.id.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static Track {
        static instance: Track = Track {
            trackEvents: ::std::vec::Vec::new(),
            tracks: ::std::vec::Vec::new(),
            time: ::protobuf::MessageField::none(),
            id: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for Track {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("Track").unwrap()).clone()
    }
}

impl ::std::fmt::Display for Track {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Track {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:zensayyy.fm.proto.TrackTimeEvent)
pub struct TrackTimeEvent {
    // message fields
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackTimeEvent.event)
    pub event: ::protobuf::EnumOrUnknown<track_time_event::Event>,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackTimeEvent.time)
    pub time: i32,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackTimeEvent.duration)
    pub duration: i32,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackTimeEvent.refTrackId)
    pub refTrackId: i32,
    // special fields
    // @@protoc_insertion_point(special_field:zensayyy.fm.proto.TrackTimeEvent.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a TrackTimeEvent {
    fn default() -> &'a TrackTimeEvent {
        <TrackTimeEvent as ::protobuf::Message>::default_instance()
    }
}

impl TrackTimeEvent {
    pub fn new() -> TrackTimeEvent {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(4);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "event",
            |m: &TrackTimeEvent| { &m.event },
            |m: &mut TrackTimeEvent| { &mut m.event },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "time",
            |m: &TrackTimeEvent| { &m.time },
            |m: &mut TrackTimeEvent| { &mut m.time },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "duration",
            |m: &TrackTimeEvent| { &m.duration },
            |m: &mut TrackTimeEvent| { &mut m.duration },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "refTrackId",
            |m: &TrackTimeEvent| { &m.refTrackId },
            |m: &mut TrackTimeEvent| { &mut m.refTrackId },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<TrackTimeEvent>(
            "TrackTimeEvent",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for TrackTimeEvent {
    const NAME: &'static str = "TrackTimeEvent";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                8 => {
                    self.event = is.read_enum_or_unknown()?;
                },
                16 => {
                    self.time = is.read_int32()?;
                },
                24 => {
                    self.duration = is.read_int32()?;
                },
                32 => {
                    self.refTrackId = is.read_int32()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if self.event != ::protobuf::EnumOrUnknown::new(track_time_event::Event::FADE_OUT) {
            my_size += ::protobuf::rt::int32_size(1, self.event.value());
        }
        if self.time != 0 {
            my_size += ::protobuf::rt::int32_size(2, self.time);
        }
        if self.duration != 0 {
            my_size += ::protobuf::rt::int32_size(3, self.duration);
        }
        if self.refTrackId != 0 {
            my_size += ::protobuf::rt::int32_size(4, self.refTrackId);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if self.event != ::protobuf::EnumOrUnknown::new(track_time_event::Event::FADE_OUT) {
            os.write_enum(1, ::protobuf::EnumOrUnknown::value(&self.event))?;
        }
        if self.time != 0 {
            os.write_int32(2, self.time)?;
        }
        if self.duration != 0 {
            os.write_int32(3, self.duration)?;
        }
        if self.refTrackId != 0 {
            os.write_int32(4, self.refTrackId)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> TrackTimeEvent {
        TrackTimeEvent::new()
    }

    fn clear(&mut self) {
        self.event = ::protobuf::EnumOrUnknown::new(track_time_event::Event::FADE_OUT);
        self.time = 0;
        self.duration = 0;
        self.refTrackId = 0;
        self.special_fields.clear();
    }

    fn default_instance() -> &'static TrackTimeEvent {
        static instance: TrackTimeEvent = TrackTimeEvent {
            event: ::protobuf::EnumOrUnknown::from_i32(0),
            time: 0,
            duration: 0,
            refTrackId: 0,
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for TrackTimeEvent {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("TrackTimeEvent").unwrap()).clone()
    }
}

impl ::std::fmt::Display for TrackTimeEvent {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TrackTimeEvent {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

/// Nested message and enums of message `TrackTimeEvent`
pub mod track_time_event {
    #[derive(Clone,Copy,PartialEq,Eq,Debug,Hash)]
    // @@protoc_insertion_point(enum:zensayyy.fm.proto.TrackTimeEvent.Event)
    pub enum Event {
        // @@protoc_insertion_point(enum_value:zensayyy.fm.proto.TrackTimeEvent.Event.FADE_OUT)
        FADE_OUT = 0,
        // @@protoc_insertion_point(enum_value:zensayyy.fm.proto.TrackTimeEvent.Event.DUCK)
        DUCK = 1,
    }

    impl ::protobuf::Enum for Event {
        const NAME: &'static str = "Event";

        fn value(&self) -> i32 {
            *self as i32
        }

        fn from_i32(value: i32) -> ::std::option::Option<Event> {
            match value {
                0 => ::std::option::Option::Some(Event::FADE_OUT),
                1 => ::std::option::Option::Some(Event::DUCK),
                _ => ::std::option::Option::None
            }
        }

        const VALUES: &'static [Event] = &[
            Event::FADE_OUT,
            Event::DUCK,
        ];
    }

    impl ::protobuf::EnumFull for Event {
        fn enum_descriptor() -> ::protobuf::reflect::EnumDescriptor {
            static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::EnumDescriptor> = ::protobuf::rt::Lazy::new();
            descriptor.get(|| super::file_descriptor().enum_by_package_relative_name("TrackTimeEvent.Event").unwrap()).clone()
        }

        fn descriptor(&self) -> ::protobuf::reflect::EnumValueDescriptor {
            let index = *self as usize;
            Self::enum_descriptor().value_by_index(index)
        }
    }

    impl ::std::default::Default for Event {
        fn default() -> Self {
            Event::FADE_OUT
        }
    }

    impl Event {
        pub(in super) fn generated_enum_descriptor_data() -> ::protobuf::reflect::GeneratedEnumDescriptorData {
            ::protobuf::reflect::GeneratedEnumDescriptorData::new::<Event>("TrackTimeEvent.Event")
        }
    }
}

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:zensayyy.fm.proto.TrackMetadata)
pub struct TrackMetadata {
    // message fields
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.trackId)
    pub trackId: ::std::string::String,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.title)
    pub title: ::std::string::String,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.artist)
    pub artist: ::std::string::String,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.thumbnail)
    pub thumbnail: ::std::string::String,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.source)
    pub source: ::std::string::String,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.length)
    pub length: i64,
    // @@protoc_insertion_point(field:zensayyy.fm.proto.TrackMetadata.extension)
    pub extension: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:zensayyy.fm.proto.TrackMetadata.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a TrackMetadata {
    fn default() -> &'a TrackMetadata {
        <TrackMetadata as ::protobuf::Message>::default_instance()
    }
}

impl TrackMetadata {
    pub fn new() -> TrackMetadata {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(7);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "trackId",
            |m: &TrackMetadata| { &m.trackId },
            |m: &mut TrackMetadata| { &mut m.trackId },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "title",
            |m: &TrackMetadata| { &m.title },
            |m: &mut TrackMetadata| { &mut m.title },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "artist",
            |m: &TrackMetadata| { &m.artist },
            |m: &mut TrackMetadata| { &mut m.artist },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "thumbnail",
            |m: &TrackMetadata| { &m.thumbnail },
            |m: &mut TrackMetadata| { &mut m.thumbnail },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "source",
            |m: &TrackMetadata| { &m.source },
            |m: &mut TrackMetadata| { &mut m.source },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "length",
            |m: &TrackMetadata| { &m.length },
            |m: &mut TrackMetadata| { &mut m.length },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "extension",
            |m: &TrackMetadata| { &m.extension },
            |m: &mut TrackMetadata| { &mut m.extension },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<TrackMetadata>(
            "TrackMetadata",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for TrackMetadata {
    const NAME: &'static str = "TrackMetadata";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.trackId = is.read_string()?;
                },
                18 => {
                    self.title = is.read_string()?;
                },
                26 => {
                    self.artist = is.read_string()?;
                },
                34 => {
                    self.thumbnail = is.read_string()?;
                },
                42 => {
                    self.source = is.read_string()?;
                },
                48 => {
                    self.length = is.read_int64()?;
                },
                58 => {
                    self.extension = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.trackId.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.trackId);
        }
        if !self.title.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.title);
        }
        if !self.artist.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.artist);
        }
        if !self.thumbnail.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.thumbnail);
        }
        if !self.source.is_empty() {
            my_size += ::protobuf::rt::string_size(5, &self.source);
        }
        if self.length != 0 {
            my_size += ::protobuf::rt::int64_size(6, self.length);
        }
        if !self.extension.is_empty() {
            my_size += ::protobuf::rt::string_size(7, &self.extension);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.trackId.is_empty() {
            os.write_string(1, &self.trackId)?;
        }
        if !self.title.is_empty() {
            os.write_string(2, &self.title)?;
        }
        if !self.artist.is_empty() {
            os.write_string(3, &self.artist)?;
        }
        if !self.thumbnail.is_empty() {
            os.write_string(4, &self.thumbnail)?;
        }
        if !self.source.is_empty() {
            os.write_string(5, &self.source)?;
        }
        if self.length != 0 {
            os.write_int64(6, self.length)?;
        }
        if !self.extension.is_empty() {
            os.write_string(7, &self.extension)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> TrackMetadata {
        TrackMetadata::new()
    }

    fn clear(&mut self) {
        self.trackId.clear();
        self.title.clear();
        self.artist.clear();
        self.thumbnail.clear();
        self.source.clear();
        self.length = 0;
        self.extension.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static TrackMetadata {
        static instance: TrackMetadata = TrackMetadata {
            trackId: ::std::string::String::new(),
            title: ::std::string::String::new(),
            artist: ::std::string::String::new(),
            thumbnail: ::std::string::String::new(),
            source: ::std::string::String::new(),
            length: 0,
            extension: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for TrackMetadata {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("TrackMetadata").unwrap()).clone()
    }
}

impl ::std::fmt::Display for TrackMetadata {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TrackMetadata {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x14protocol/Track.proto\x12\x11zensayyy.fm.proto\x1a\x1fgoogle/protob\
    uf/timestamp.proto\"\xc6\x01\n\x05Track\x12C\n\x0btrackEvents\x18\x01\
    \x20\x03(\x0b2!.zensayyy.fm.proto.TrackTimeEventR\x0btrackEvents\x128\n\
    \x06tracks\x18\x02\x20\x03(\x0b2\x20.zensayyy.fm.proto.TrackMetadataR\
    \x06tracks\x12.\n\x04time\x18\x03\x20\x01(\x0b2\x1a.google.protobuf.Time\
    stampR\x04time\x12\x0e\n\x02id\x18\x04\x20\x01(\tR\x02id\"\xc0\x01\n\x0e\
    TrackTimeEvent\x12=\n\x05event\x18\x01\x20\x01(\x0e2'.zensayyy.fm.proto.\
    TrackTimeEvent.EventR\x05event\x12\x12\n\x04time\x18\x02\x20\x01(\x05R\
    \x04time\x12\x1a\n\x08duration\x18\x03\x20\x01(\x05R\x08duration\x12\x1e\
    \n\nrefTrackId\x18\x04\x20\x01(\x05R\nrefTrackId\"\x1f\n\x05Event\x12\
    \x0c\n\x08FADE_OUT\x10\0\x12\x08\n\x04DUCK\x10\x01\"\xc3\x01\n\rTrackMet\
    adata\x12\x18\n\x07trackId\x18\x01\x20\x01(\tR\x07trackId\x12\x14\n\x05t\
    itle\x18\x02\x20\x01(\tR\x05title\x12\x16\n\x06artist\x18\x03\x20\x01(\t\
    R\x06artist\x12\x1c\n\tthumbnail\x18\x04\x20\x01(\tR\tthumbnail\x12\x16\
    \n\x06source\x18\x05\x20\x01(\tR\x06source\x12\x16\n\x06length\x18\x06\
    \x20\x01(\x03R\x06length\x12\x1c\n\textension\x18\x07\x20\x01(\tR\texten\
    sionJ\xbe\x08\n\x06\x12\x04\0\0\x1e\x01\n\x08\n\x01\x0c\x12\x03\0\0\x12\
    \n\x08\n\x01\x02\x12\x03\x01\0\x1a\n\t\n\x02\x03\0\x12\x03\x02\0)\n\n\n\
    \x02\x04\0\x12\x04\x04\0\t\x01\n\n\n\x03\x04\0\x01\x12\x03\x04\x08\r\n\
    \x0b\n\x04\x04\0\x02\0\x12\x03\x05\x02*\n\x0c\n\x05\x04\0\x02\0\x04\x12\
    \x03\x05\x02\n\n\x0c\n\x05\x04\0\x02\0\x06\x12\x03\x05\x0b\x19\n\x0c\n\
    \x05\x04\0\x02\0\x01\x12\x03\x05\x1a%\n\x0c\n\x05\x04\0\x02\0\x03\x12\
    \x03\x05()\n\x0b\n\x04\x04\0\x02\x01\x12\x03\x06\x02$\n\x0c\n\x05\x04\0\
    \x02\x01\x04\x12\x03\x06\x02\n\n\x0c\n\x05\x04\0\x02\x01\x06\x12\x03\x06\
    \x0b\x18\n\x0c\n\x05\x04\0\x02\x01\x01\x12\x03\x06\x19\x1f\n\x0c\n\x05\
    \x04\0\x02\x01\x03\x12\x03\x06\"#\n\x0b\n\x04\x04\0\x02\x02\x12\x03\x07\
    \x02%\n\x0c\n\x05\x04\0\x02\x02\x06\x12\x03\x07\x02\x1b\n\x0c\n\x05\x04\
    \0\x02\x02\x01\x12\x03\x07\x1c\x20\n\x0c\n\x05\x04\0\x02\x02\x03\x12\x03\
    \x07#$\n\x0b\n\x04\x04\0\x02\x03\x12\x03\x08\x02\x10\n\x0c\n\x05\x04\0\
    \x02\x03\x05\x12\x03\x08\x02\x08\n\x0c\n\x05\x04\0\x02\x03\x01\x12\x03\
    \x08\t\x0b\n\x0c\n\x05\x04\0\x02\x03\x03\x12\x03\x08\x0e\x0f\n\n\n\x02\
    \x04\x01\x12\x04\x0b\0\x14\x01\n\n\n\x03\x04\x01\x01\x12\x03\x0b\x08\x16\
    \n\x0c\n\x04\x04\x01\x04\0\x12\x04\x0c\x02\x0f\x03\n\x0c\n\x05\x04\x01\
    \x04\0\x01\x12\x03\x0c\x07\x0c\n\r\n\x06\x04\x01\x04\0\x02\0\x12\x03\r\
    \x04\x11\n\x0e\n\x07\x04\x01\x04\0\x02\0\x01\x12\x03\r\x04\x0c\n\x0e\n\
    \x07\x04\x01\x04\0\x02\0\x02\x12\x03\r\x0f\x10\n\r\n\x06\x04\x01\x04\0\
    \x02\x01\x12\x03\x0e\x04\r\n\x0e\n\x07\x04\x01\x04\0\x02\x01\x01\x12\x03\
    \x0e\x04\x08\n\x0e\n\x07\x04\x01\x04\0\x02\x01\x02\x12\x03\x0e\x0b\x0c\n\
    \x0b\n\x04\x04\x01\x02\0\x12\x03\x10\x02\x12\n\x0c\n\x05\x04\x01\x02\0\
    \x06\x12\x03\x10\x02\x07\n\x0c\n\x05\x04\x01\x02\0\x01\x12\x03\x10\x08\r\
    \n\x0c\n\x05\x04\x01\x02\0\x03\x12\x03\x10\x10\x11\n\x0b\n\x04\x04\x01\
    \x02\x01\x12\x03\x11\x02\x11\n\x0c\n\x05\x04\x01\x02\x01\x05\x12\x03\x11\
    \x02\x07\n\x0c\n\x05\x04\x01\x02\x01\x01\x12\x03\x11\x08\x0c\n\x0c\n\x05\
    \x04\x01\x02\x01\x03\x12\x03\x11\x0f\x10\n\x0b\n\x04\x04\x01\x02\x02\x12\
    \x03\x12\x02\x15\n\x0c\n\x05\x04\x01\x02\x02\x05\x12\x03\x12\x02\x07\n\
    \x0c\n\x05\x04\x01\x02\x02\x01\x12\x03\x12\x08\x10\n\x0c\n\x05\x04\x01\
    \x02\x02\x03\x12\x03\x12\x13\x14\n\x0b\n\x04\x04\x01\x02\x03\x12\x03\x13\
    \x02\x17\n\x0c\n\x05\x04\x01\x02\x03\x05\x12\x03\x13\x02\x07\n\x0c\n\x05\
    \x04\x01\x02\x03\x01\x12\x03\x13\x08\x12\n\x0c\n\x05\x04\x01\x02\x03\x03\
    \x12\x03\x13\x15\x16\n\n\n\x02\x04\x02\x12\x04\x16\0\x1e\x01\n\n\n\x03\
    \x04\x02\x01\x12\x03\x16\x08\x15\n\x0b\n\x04\x04\x02\x02\0\x12\x03\x17\
    \x02\x15\n\x0c\n\x05\x04\x02\x02\0\x05\x12\x03\x17\x02\x08\n\x0c\n\x05\
    \x04\x02\x02\0\x01\x12\x03\x17\t\x10\n\x0c\n\x05\x04\x02\x02\0\x03\x12\
    \x03\x17\x13\x14\n\x0b\n\x04\x04\x02\x02\x01\x12\x03\x18\x02\x13\n\x0c\n\
    \x05\x04\x02\x02\x01\x05\x12\x03\x18\x02\x08\n\x0c\n\x05\x04\x02\x02\x01\
    \x01\x12\x03\x18\t\x0e\n\x0c\n\x05\x04\x02\x02\x01\x03\x12\x03\x18\x11\
    \x12\n\x0b\n\x04\x04\x02\x02\x02\x12\x03\x19\x02\x14\n\x0c\n\x05\x04\x02\
    \x02\x02\x05\x12\x03\x19\x02\x08\n\x0c\n\x05\x04\x02\x02\x02\x01\x12\x03\
    \x19\t\x0f\n\x0c\n\x05\x04\x02\x02\x02\x03\x12\x03\x19\x12\x13\n\x0b\n\
    \x04\x04\x02\x02\x03\x12\x03\x1a\x02\x17\n\x0c\n\x05\x04\x02\x02\x03\x05\
    \x12\x03\x1a\x02\x08\n\x0c\n\x05\x04\x02\x02\x03\x01\x12\x03\x1a\t\x12\n\
    \x0c\n\x05\x04\x02\x02\x03\x03\x12\x03\x1a\x15\x16\n\x0b\n\x04\x04\x02\
    \x02\x04\x12\x03\x1b\x02\x14\n\x0c\n\x05\x04\x02\x02\x04\x05\x12\x03\x1b\
    \x02\x08\n\x0c\n\x05\x04\x02\x02\x04\x01\x12\x03\x1b\t\x0f\n\x0c\n\x05\
    \x04\x02\x02\x04\x03\x12\x03\x1b\x12\x13\n\x0b\n\x04\x04\x02\x02\x05\x12\
    \x03\x1c\x02\x13\n\x0c\n\x05\x04\x02\x02\x05\x05\x12\x03\x1c\x02\x07\n\
    \x0c\n\x05\x04\x02\x02\x05\x01\x12\x03\x1c\x08\x0e\n\x0c\n\x05\x04\x02\
    \x02\x05\x03\x12\x03\x1c\x11\x12\n\x0b\n\x04\x04\x02\x02\x06\x12\x03\x1d\
    \x02\x17\n\x0c\n\x05\x04\x02\x02\x06\x05\x12\x03\x1d\x02\x08\n\x0c\n\x05\
    \x04\x02\x02\x06\x01\x12\x03\x1d\t\x12\n\x0c\n\x05\x04\x02\x02\x06\x03\
    \x12\x03\x1d\x15\x16b\x06proto3\
";

/// `FileDescriptorProto` object which was a source for this generated file
fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    static file_descriptor_proto_lazy: ::protobuf::rt::Lazy<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::rt::Lazy::new();
    file_descriptor_proto_lazy.get(|| {
        ::protobuf::Message::parse_from_bytes(file_descriptor_proto_data).unwrap()
    })
}

/// `FileDescriptor` object which allows dynamic access to files
pub fn file_descriptor() -> &'static ::protobuf::reflect::FileDescriptor {
    static generated_file_descriptor_lazy: ::protobuf::rt::Lazy<::protobuf::reflect::GeneratedFileDescriptor> = ::protobuf::rt::Lazy::new();
    static file_descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::FileDescriptor> = ::protobuf::rt::Lazy::new();
    file_descriptor.get(|| {
        let generated_file_descriptor = generated_file_descriptor_lazy.get(|| {
            let mut deps = ::std::vec::Vec::with_capacity(1);
            deps.push(::protobuf::well_known_types::timestamp::file_descriptor().clone());
            let mut messages = ::std::vec::Vec::with_capacity(3);
            messages.push(Track::generated_message_descriptor_data());
            messages.push(TrackTimeEvent::generated_message_descriptor_data());
            messages.push(TrackMetadata::generated_message_descriptor_data());
            let mut enums = ::std::vec::Vec::with_capacity(1);
            enums.push(track_time_event::Event::generated_enum_descriptor_data());
            ::protobuf::reflect::GeneratedFileDescriptor::new_generated(
                file_descriptor_proto(),
                deps,
                messages,
                enums,
            )
        });
        ::protobuf::reflect::FileDescriptor::new_generated_2(generated_file_descriptor)
    })
}
