$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-Java-StockService
.\mvnw package -DskipTests
az spring-cloud app deploy -g $rg -s $serviceASC -n stock-java-service --jar-path .\target\stockservice-0.0.1-SNAPSHOT.jar