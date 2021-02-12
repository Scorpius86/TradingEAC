using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.SecurityService.Data.Contexts;
using TradingEAC.DotNet.SecurityService.Data.Entities;

namespace TradingEAC.DotNet.SecurityService.Data
{
    public static class Seeds
    {
        public static void UserSeed(this SecurityContext context)
        {
            if (context.Users.Count() == 0)
            {
                context.Users.AddRange(
                    new User
                    {
                        id = Guid.NewGuid(),
                        userId = 1,
                        userName = "Erick",
                        password = "Erick"
                    },
                    new User
                    {                     
                        id = Guid.NewGuid(),
                        userId = 2,
                        userName = "Oscar",
                        password = "Oscar"
                    }
                );

                context.SaveChanges();
            }
            
        }
    }
}
