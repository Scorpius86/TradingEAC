using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.StockService.Agents;
using Steeltoe.Discovery.Client;
using Steeltoe.Management.Exporter.Tracing;
using Steeltoe.Management.Tracing;
using Steeltoe.Management.Endpoint.Health;
using Steeltoe.Management.Endpoint.Metrics;
using Steeltoe.Management.Endpoint;

namespace TradingEAC.DotNet.StockService
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

            services.AddHttpClient<CompanyProfileAgent>();
            services.AddHttpClient<SymbolAgent>();            

            services.AddMemoryCache();

            services.AddControllers();
            services.AddCors(o => o.AddPolicy("AllowAllCORS", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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

