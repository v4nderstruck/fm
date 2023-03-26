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
  maven(url = "https://jitpack.io")
}

dependencies {
  compileOnly("org.projectlombok:lombok:1.18.26")
  annotationProcessor("org.projectlombok:lombok:1.18.26")

  implementation("org.projectlombok:lombok:1.18.26")
  implementation("javax.annotation:javax.annotation-api:1.3.2")
  implementation("com.github.TeamNewPipe.NewPipeExtractor:NewPipeExtractor:v0.22.5")
  implementation("com.google.protobuf:protobuf-java:3.22.0")
  implementation("org.springframework.boot:spring-boot-starter-webflux:3.0.4")
  implementation("org.json:json:20230227")
  implementation("org.springframework.boot:spring-boot-starter-websocket")
  implementation("org.springframework.boot:spring-boot-starter-web:3.0.5")

  testCompileOnly("org.projectlombok:lombok:1.18.26")
  testAnnotationProcessor("org.projectlombok:lombok:1.18.26")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.springframework:spring-webflux")
}

tasks.withType<Test> { useJUnitPlatform() }
