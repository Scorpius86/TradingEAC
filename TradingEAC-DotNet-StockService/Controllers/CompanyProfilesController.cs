using Microsoft.AspNetCore.Http;
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

namespace TradingEAC.DotNet.StockService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CompanyProfilesController : ControllerBase
    {
        private readonly CompanyProfileAgent _companyProfileAgent;
        private readonly IConfiguration _configuration;
        private readonly ILogger<CompanyProfilesController> _logger;

        public CompanyProfilesController(CompanyProfileAgent companyProfileAgent,IConfiguration configuration,ILogger<CompanyProfilesController> logger)
        {
            _companyProfileAgent = companyProfileAgent;
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
        public async Task<CompanyProfile> GetCompanyProfile(string symbol)
        {
            return await _companyProfileAgent.GetCompanyProfile(symbol);
        }

        [HttpGet]
        public async Task<IEnumerable<CompanyProfile>> ListCompanyProfile([FromQuery]List<string> symbols)
        {
            return await _companyProfileAgent.ListCompanyProfiles(symbols);
        }
    }
}
