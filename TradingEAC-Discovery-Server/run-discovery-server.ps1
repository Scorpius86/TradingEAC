cd TradingEAC-Discovery-Server
.\mvnw package -DskipTests
java -jar .\target\server-0.0.1-SNAPSHOT.jar --spring.profiles.active=local