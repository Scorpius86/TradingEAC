using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TradingEAC.DotNet.StockService.Models;

namespace TradingEAC.DotNet.StockService.Agents
{
    public class CompanyProfileAgent
    {        
        //https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=[TOKEN_FINHUB]"
        private readonly string ProfileUrl = "https://finnhub.io/api/v1/stock/profile2";
        private readonly string Token = "[TOKEN_FINHUB]";

        private readonly HttpClient _client;
        private IMemoryCache _cache;

        public CompanyProfileAgent(HttpClient client,IMemoryCache cache)
        {
            client.BaseAddress = new Uri(ProfileUrl);
            _client = client;
            _cache = cache;
        }

        public async Task<CompanyProfile> GetCompanyProfile(string symbol)
        {
            symbol=symbol.ToUpper();
            CompanyProfile companyProfile;

            if (!_cache.TryGetValue(symbol, out companyProfile))
            {
                var response = await _client.GetAsync($"?symbol={symbol}&token={Token}");
                response.EnsureSuccessStatusCode();
                using var responseStream = await response.Content.ReadAsStreamAsync();
                companyProfile = await JsonSerializer.DeserializeAsync<CompanyProfile>(responseStream);
                companyProfile.symbol = symbol.ToUpper();

                var cacheEntryOptions = new MemoryCacheEntryOptions()                
                    .SetSlidingExpiration(TimeSpan.FromMinutes(60));

                _cache.Set(symbol, companyProfile, cacheEntryOptions);
            }

            return await Task.FromResult(companyProfile);
        }

        public async Task<IEnumerable<CompanyProfile>> ListCompanyProfiles(List<string> symbols)
        {            
            List<Task<CompanyProfile>> tasks = new List<Task<CompanyProfile>>();
            List<CompanyProfile> companyProfiles = new List<CompanyProfile>();

            symbols.ForEach(symbol =>
            {                
                Task<CompanyProfile> task = Task<CompanyProfile>.Factory.StartNew(() => GetCompanyProfile(symbol).Result);             
                tasks.Add(task);
            });
                        
            Task.WaitAll(tasks.ToArray());

            tasks.ForEach(task =>
            {            
                companyProfiles.Add(task.Result);
            });
            
            return await Task.FromResult(companyProfiles);
        }
    }
}

