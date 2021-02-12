start /min powershell.exe .\TradingEAC-Gateway\run-gateway.ps1
start /min powershell.exe .\TradingEAC-Discovery-Server\run-discovery-server.ps1

start /min powershell.exe .\TradingEAC-Java-PriceService\run-price-java-service.ps1
start /min powershell.exe .\TradingEAC-Java-SecurityService\run-security-java-service.ps1
start /min powershell.exe .\TradingEAC-Java-StockService\run-stock-java-service.ps1

start /min powershell.exe .\TradingEAC-DotNet-PriceService\run-price-dotnet-service.ps1
start /min powershell.exe .\TradingEAC-DotNet-SecurityService\run-security-dotnet-service.ps1
start /min powershell.exe .\TradingEAC-DotNet-StockService\run-stock-dotnet-service.ps1

start /min powershell.exe .\TradingEAC-FrontEnd\run-frontend.ps1