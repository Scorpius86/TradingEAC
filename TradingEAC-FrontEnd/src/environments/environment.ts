// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
        java:"http://localhost:8080/PRICE-JAVA-SERVICE/",
        dotnet:"http://localhost:8080/PRICE-DOTNET-SERVICE/"
    },
    stockService:{      
      java:"http://localhost:8080/STOCK-JAVA-SERVICE/",
      dotnet:"http://localhost:8080/STOCK-DOTNET-SERVICE/"
    },
    securityService:{      
      java:"http://localhost:8080/SECURITY-JAVA-SERVICE/",
      dotnet:"http://localhost:8080/SECURITY-DOTNET-SERVICE/"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
