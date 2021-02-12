using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.SecurityService.Data.Contexts;
using TradingEAC.DotNet.SecurityService.Data.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text;

namespace TradingEAC.DotNet.SecurityService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly SecurityContext _securityContext;
        private readonly IConfiguration _configuration;
        private readonly ILogger<SecurityController> _logger;
        public SecurityController(SecurityContext securityContext,IConfiguration configuration,ILogger<SecurityController> logger)
        {
            _securityContext = securityContext;
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

        [HttpPost]
        public IActionResult ValidateUser([FromBody] User user)
        {
            User userdb = _securityContext.Users.Where(w => w.userName == user.userName).FirstOrDefault();
            if (userdb !=null)
            {
                if(user.password == userdb.password)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            else
            {
                return Ok(false);
            }
            
        }
    }
}
