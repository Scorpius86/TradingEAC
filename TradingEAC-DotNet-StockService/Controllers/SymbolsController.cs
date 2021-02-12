using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.StockService.Agents;
using TradingEAC.DotNet.StockService.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TradingEAC.DotNet.StockService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SymbolsController : ControllerBase
    {
        private readonly SymbolAgent _symbolAgent;
        private readonly IConfiguration _configuration;
        private readonly ILogger<SymbolsController> _logger;

        public SymbolsController(SymbolAgent symbolAgent,IConfiguration configuration,ILogger<SymbolsController> logger)
        {
            _symbolAgent = symbolAgent;
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
        // GET: StocksController
        // GET: api/<SymbolsController>
        [HttpGet]
        public async Task<IEnumerable<StockSymbol>> ListStockSymbols()
        {
            return await _symbolAgent.ListStockSymbols();
        }        
    }
}
