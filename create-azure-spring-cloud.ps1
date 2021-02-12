$rg=$args[0]
$serviceASC=$args[1]

az group create -l eastus2 -n $rg

#az monitor log-analytics workspace create -g $rg -n "Log-Analytics-workspaces-$serviceASC" -l eastus2

az spring-cloud create -g $rg -n $serviceASC -l eastus2 --sku standard

az spring-cloud app create -g $rg -s $serviceASC -n gateway --runtime-version Java_11 --is-public true

az spring-cloud app create -g $rg -s $serviceASC -n price-java-service --runtime-version Java_11

az spring-cloud app create -g $rg -s $serviceASC -n security-java-service --runtime-version Java_11

az spring-cloud app create -g $rg -s $serviceASC -n stock-java-service --runtime-version Java_11

az spring-cloud app create -g $rg -s $serviceASC -n price-dotnet-service --runtime-version NetCore_31

az spring-cloud app create -g $rg -s $serviceASC -n security-dotnet-service --runtime-version NetCore_31

az spring-cloud app create -g $rg -s $serviceASC -n stock-dotnet-service --runtime-version NetCore_31
