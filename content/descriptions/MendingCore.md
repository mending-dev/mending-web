A foundational library designed to provide essential utilities and shared functionality for all of my other Minecraft plugins. It acts as a core dependency that must be installed on your server to enable seamless integration and shared features across multiple plugins.

While this Plugin is designed primarily to support my own plugin ecosystem, it is fully open and available for anyone to use in their own plugins. Feel free to integrate and build upon it to simplify your development and share utilities across your projects.

---

## Features
- **ItemBuilder**
Simplify item creation with an intuitive API for building custom items.
- **Custom GUIs**
Create interactive, custom graphical user interfaces with pagination and more.
- **Villager Trades**
Create your own unique villager trades.
- **Configurations**
Flexible and powerful configuration handling using JSON or YAML format.
- **Language Utilities**
Tools to easily manage multilingual support and localization.
- **Additional Utilities**
More helpful tools to enhance plugin development and functionality.

---

## Getting Started

### 1. Installation

The **MendingCore plugin must be installed on the server** before any dependent plugin can use its API. It acts as a shared core and provides necessary classes and services.

### 2. Add MendingCore as a Dependency

Add the Maven repository to your build tool configuration:

#### Gradle (Groovy DSL)

```groovy
repositories {
    mavenCentral()
    maven {
        url = "https://repo.mending.dev/releases" // or snapshots if needed
    }
}
```
```groovy
dependencies {
    implementation "dev.mending.core:paper-api:VERSION"
}
```

#### Gradle (Kotlin DSL)

```kotlin
repositories {
    mavenCentral()
    maven("https://repo.mending.dev/releases") // or snapshots if needed
}
```
```kotlin
dependencies {
    implementation("dev.mending.core:paper-api:VERSION")
}
```

#### Maven

```xml
<repositories>
    <repository>
        <id>mending-repo</id>
        <url>https://repo.mending.dev/releases</url>
    </repository>
</repositories>
```
```xml
<dependencies>
    <dependency>
        <groupId>dev.mending.core</groupId>
        <artifactId>paper-api</artifactId>
        <version>VERSION</version>
    </dependency>
</dependencies>
```

### 3. Declare MendingCore as a Plugin Dependency

In your plugin's `plugin.yml` or `paper-plugin.yml`, declare a dependency to ensure MendingCore loads first:

```yaml
name: Example-Plugin
version: 1.0.0
main: com.example.paperplugin.ExamplePlugin
depend: [MendingCore]
```

---
