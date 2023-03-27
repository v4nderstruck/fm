makedir: 
	mkdir -p mixer/src-tauri/src/proto
	mkdir -p mixer/types

proto: makedir
	protoc --java_out=backend/src/main/java protocol/*.proto 
	protoc --plugin=backend/testClient/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=frontend/types\
		--ts_proto_opt=esModuleInterop=true protocol/*.proto
	protoc --plugin=backend/testClient/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=mixer/types\
		--ts_proto_opt=esModuleInterop=true protocol/*.proto
	protoc --rust_out=mixer/src-tauri/src/proto/ protocol/*.proto

