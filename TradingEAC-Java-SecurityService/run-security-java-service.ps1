cd TradingEAC-Java-SecurityService
.\mvnw package -DskipTests
java -jar .\target\securityservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=local