cd TradingEAC-Java-StockService
.\mvnw package -DskipTests
java -jar .\target\stockservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=local