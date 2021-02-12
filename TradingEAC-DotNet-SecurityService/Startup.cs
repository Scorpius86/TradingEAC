using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.SecurityService.Data;
using TradingEAC.DotNet.SecurityService.Data.Contexts;
using Steeltoe.Discovery.Client;
using Steeltoe.Management.Exporter.Tracing;
using Steeltoe.Management.Tracing;
using Steeltoe.Management.Endpoint.Health;
using Steeltoe.Management.Endpoint.Metrics;
using Steeltoe.Management.Endpoint;
using System.Text;

namespace TradingEAC.DotNet.SecurityService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(configure => configure.AddConsole());
            services.AddDiscoveryClient(Configuration);
            services.AddHealthActuator(Configuration);
            services.AddMetricsActuator(Configuration);
            services.AddDistributedTracing(Configuration, builder => builder.UseZipkinWithTraceOptions(services));

            string accountEndPoint = Configuration.GetSection("applications:security-dotnet-service:azure:cosmosdb:uri").Value;
            string accountKey = Configuration.GetSection("applications:security-dotnet-service:azure:cosmosdb:key").Value;
            string databaseName = Configuration.GetSection("applications:security-dotnet-service:azure:cosmosdb:database").Value;

            services.AddDbContext<SecurityContext>(opt =>
            {
                opt.UseCosmos(accountEndPoint, accountKey, databaseName);
            });
            services.AddControllers();
            services.AddCors(o => o.AddPolicy("AllowAllCORS", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, SecurityContext context,ILogger<Startup> logger)
        {
            logger.LogInformation("Number keys : " + Configuration.AsEnumerable().Count().ToString());
            StringBuilder sb = new StringBuilder();
            Configuration.AsEnumerable().ToList().ForEach(pair =>
            {
                sb.AppendLine(pair.Key + " : " + pair.Value);
            });
            logger.LogInformation(sb.ToString());

            context.UserSeed();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

             app.UseDiscoveryClient();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("AllowAllCORS");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.Map<HealthEndpoint>();
                endpoints.Map<MetricsEndpoint>();
            });
        }
    }
}
