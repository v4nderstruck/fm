proto:
	protoc --java_out=backend/src/main/java protocol/*.proto 
	protoc --plugin=backend/testClient/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=backend/testClient/src/proto\
		--ts_proto_opt=esModuleInterop=true protocol/*.proto