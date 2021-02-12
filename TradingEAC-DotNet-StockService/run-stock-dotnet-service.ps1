cd TradingEAC-DotNet-StockService
dotnet restore
dotnet publish -o publish
dotnet .\publish\TradingEAC.DotNet.StockService.dll --environment "Development" --urls "http://localhost:57298"