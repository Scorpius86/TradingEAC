$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-Gateway
.\mvnw package -DskipTests
az spring-cloud app deploy -g $rg -s $serviceASC -n gateway --jar-path .\target\gateway-0.0.1-SNAPSHOT.jar