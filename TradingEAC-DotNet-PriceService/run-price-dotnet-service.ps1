cd TradingEAC-DotNet-PriceService
dotnet restore
dotnet publish -o publish
dotnet .\publish\TradingEAC.DotNet.PriceService.dll --environment "Development" --urls "http://localhost:53047"