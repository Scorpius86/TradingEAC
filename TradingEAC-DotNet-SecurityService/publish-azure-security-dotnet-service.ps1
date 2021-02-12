$rg=$args[0]
$serviceASC=$args[1]

cd TradingEAC-DotNet-SecurityService
dotnet publish -c release
az spring-cloud app deploy -g $rg -s $serviceASC -n security-dotnet-service --main-entry TradingEAC.DotNet.SecurityService.dll --runtime-version NetCore_31 --artifact-path ./deploy.zip