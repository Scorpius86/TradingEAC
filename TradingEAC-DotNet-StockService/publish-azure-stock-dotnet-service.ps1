$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-DotNet-StockService
dotnet publish -c release
az spring-cloud app deploy -g $rg -s $serviceASC -n stock-dotnet-service --main-entry TradingEAC.DotNet.StockService.dll --runtime-version NetCore_31 --artifact-path ./deploy.zip