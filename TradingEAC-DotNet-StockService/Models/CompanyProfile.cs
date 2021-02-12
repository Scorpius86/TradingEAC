using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradingEAC.DotNet.StockService.Models
{
    public class CompanyProfile
    {
        public string symbol { get; set; }
        public string country { get; set; }
        public string currency { get; set; }
        public string exchange { get; set; }
        public string name { get; set; }
        public string ticker { get; set; }
        public DateTime ipo { get; set; }
        public decimal marketCapitalization { get; set; }
        public decimal shareOutstanding { get; set; }
        public string logo { get; set; }
        public string phone { get; set; }
        public string weburl { get; set; }
        public string finnhubIndustry { get; set; }
    }
}
