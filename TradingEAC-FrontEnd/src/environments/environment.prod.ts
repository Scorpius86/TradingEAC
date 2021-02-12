export const environment = {
  production: true,
  localStorageKeys:{
    home:{
          listCompanyProfiles : 'TradingEAC.Home.ListCompanyProfiles'
    },
    apiSettings:{
      settings:'TradingEAC.ApiSettings.Settings'
    }
  },
  services:{
    priceService:{      
        java:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/PRICE-JAVA-SERVICE/",
        dotnet:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/PRICE-DOTNET-SERVICE/"
    },
    stockService:{      
      java:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/STOCK-JAVA-SERVICE/",
      dotnet:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/STOCK-DOTNET-SERVICE/"
    },
    securityService:{      
      java:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/SECURITY-JAVA-SERVICE/",
      dotnet:"https://azure-spring-cloud-tradingeac-gateway.azuremicroservices.io/SECURITY-DOTNET-SERVICE/"
    }
  }
};
