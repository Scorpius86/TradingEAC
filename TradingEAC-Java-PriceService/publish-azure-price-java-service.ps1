$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-Java-PriceService
.\mvnw package -DskipTests
az spring-cloud app deploy -g $rg -s $serviceASC -n price-java-service --jar-path .\target\priceservice-0.0.1-SNAPSHOT.jar