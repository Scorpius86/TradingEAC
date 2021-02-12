using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradingEAC.DotNet.SecurityService.Data.Entities
{
    public class User
    {
        public Guid id { get; set; }
        public int userId { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}
