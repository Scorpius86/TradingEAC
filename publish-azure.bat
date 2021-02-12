set rg=%1
set serviceASC=%2

start /min powershell.exe .\TradingEAC-Gateway\publish-azure-gateway.ps1 %rg% %serviceASC%

start /min powershell.exe .\TradingEAC-Java-PriceService\publish-azure-price-java-service.ps1 %rg% %serviceASC%
start /min powershell.exe .\TradingEAC-Java-SecurityService\publish-azure-security-java-service.ps1 %rg% %serviceASC%
start /min powershell.exe .\TradingEAC-Java-StockService\publish-azure-stock-java-service.ps1 %rg% %serviceASC%

start /min powershell.exe .\TradingEAC-DotNet-PriceService\publish-azure-price-dotnet-service.ps1 %rg% %serviceASC%
start /min powershell.exe .\TradingEAC-DotNet-SecurityService\publish-azure-security-dotnet-service.ps1 %rg% %serviceASC%
start /min powershell.exe .\TradingEAC-DotNet-StockService\publish-azure-stock-dotnet-service.ps1 %rg% %serviceASC%