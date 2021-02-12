cd TradingEAC-Java-PriceService
.\mvnw package -DskipTests
java -jar .\target\priceservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=local