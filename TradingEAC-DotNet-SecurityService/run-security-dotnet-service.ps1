cd TradingEAC-DotNet-SecurityService
dotnet restore
dotnet publish -o publish
dotnet .\publish\TradingEAC.DotNet.SecurityService.dll --environment "Development" --urls "http://localhost:62643"