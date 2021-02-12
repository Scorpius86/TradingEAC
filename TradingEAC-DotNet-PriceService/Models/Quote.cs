using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradingEAC.DotNet.PriceService.Models
{
    public class Quote
    {
        public string symbol { get; set; }
        public decimal c { get; set; }
        public decimal h { get; set; }
        public decimal i { get; set; }
        public decimal o { get; set; }
        public decimal pc { get; set; }
        public long t { get; set; }        
    }
}
