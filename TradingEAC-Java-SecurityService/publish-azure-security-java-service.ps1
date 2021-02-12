$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-Java-SecurityService
.\mvnw package -DskipTests
az spring-cloud app deploy -g $rg -s $serviceASC -n security-java-service --jar-path .\target\securityservice-0.0.1-SNAPSHOT.jar