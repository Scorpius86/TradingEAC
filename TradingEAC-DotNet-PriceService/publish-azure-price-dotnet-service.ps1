$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-DotNet-PriceService
dotnet publish -c release
az spring-cloud app deploy -g $rg -s $serviceASC -n price-dotnet-service --main-entry TradingEAC.DotNet.PriceService.dll --runtime-version NetCore_31 --artifact-path ./deploy.zip