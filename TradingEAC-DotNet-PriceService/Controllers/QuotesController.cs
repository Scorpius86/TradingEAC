using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.PriceService.Agents;
using TradingEAC.DotNet.PriceService.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text;

namespace TradingEAC.DotNet.PriceService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly QuoteAgent _quoteAgent;
        private readonly IConfiguration _configuration;
        private readonly ILogger<QuotesController> _logger;
        public QuotesController(QuoteAgent quoteAgent,IConfiguration configuration,ILogger<QuotesController> logger)
        {
            _quoteAgent = quoteAgent;
            _configuration = configuration;
            _logger = logger;

            _logger.LogInformation("Number keys : " + _configuration.AsEnumerable().Count().ToString());
            StringBuilder sb = new StringBuilder();
            _configuration.AsEnumerable().ToList().ForEach(pair =>
            {
                sb.AppendLine(pair.Key + " : " + pair.Value);
            });
            _logger.LogInformation(sb.ToString());
        }

        [HttpGet("{symbol}")]
        public async Task<Quote> GetQuote(string symbol)
        {
            return await _quoteAgent.GetQuote(symbol);
        }

        [HttpGet]
        public async Task<IEnumerable<Quote>> ListQuotes([FromQuery] List<string> symbols)
        {
            return await _quoteAgent.ListQuotes(symbols);
        }
    }
}
