plugins {
	java
	id("org.springframework.boot") version "3.0.3"
	id("io.spring.dependency-management") version "1.1.0"
}

group = "zensayyy"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	compileOnly("org.projectlombok:lombok:1.18.26")
	annotationProcessor("org.projectlombok:lombok:1.18.26")

	implementation("org.springframework.boot:spring-boot-starter-graphql")
	implementation("org.springframework.boot:spring-boot-starter-websocket")

	testCompileOnly("org.projectlombok:lombok:1.18.26")
	testAnnotationProcessor("org.projectlombok:lombok:1.18.26")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework:spring-webflux")
	testImplementation("org.springframework.graphql:spring-graphql-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
