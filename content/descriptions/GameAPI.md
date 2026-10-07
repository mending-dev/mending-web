A powerful and flexible API designed to make the creation of round-based Minecraft minigames simple and efficient.  
It provides essential building blocks such as game state management, timers, team handling, and custom events, allowing developers to focus on the gameplay instead of boilerplate logic.

While this plugin is primarily designed for my own projects, it is fully open for anyone to use. You can easily integrate it into your own plugins to speed up development and build your own minigame.

---

## 🚀 Features
- **Round-based Game Framework**  
  Quickly set up and manage round-based minigames with minimal effort.
- **Timers (Built-in & Custom)**  
  Use predefined timers or create your own to control game flow and mechanics.
- **Automatic State Manager**  
  Handle game states like WAITING and RUNNING with built-in state transitions.
- **Team Support**  
  Create, manage, and balance teams seamlessly.
- **Custom Events**  
  React to in-game actions with custom events.
- **Additional Utilities**  
  Flexible utilities designed to accelerate game development.

---

## Getting Started

### 1. Installation

The **GameAPI plugin must be installed on the server** before any dependent plugin can use its API.  
It acts as a shared core and provides necessary classes and services for minigame development.

### 2. Add GameAPI as a Dependency

Add the Maven repository to your build tool configuration:

#### Gradle (Groovy DSL)

```groovy
repositories {
    mavenCentral()
    maven {
        url = "https://repo.mending.dev/releases"
    }
}
```
```groovy
dependencies {
    implementation "dev.mending.game:api:VERSION"
}
```

#### Gradle (Kotlin DSL)

```kotlin
repositories {
    mavenCentral()
    maven("https://repo.mending.dev/releases")
}
```
```kotlin
dependencies {
    implementation("dev.mending.game:api:VERSION")
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
        <groupId>dev.mending.game</groupId>
        <artifactId>api</artifactId>
        <version>VERSION</version>
    </dependency>
</dependencies>
```

### 3. Declare GameAPI as a Plugin Dependency

In your plugin's `plugin.yml` or `paper-plugin.yml`, declare GameAPI as a dependency to ensure it loads first:

```yaml
depend: [GameAPI]
```

---