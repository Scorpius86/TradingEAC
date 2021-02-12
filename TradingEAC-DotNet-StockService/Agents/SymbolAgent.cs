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
    public class SymbolAgent
    {
        private readonly HttpClient _client;
        private IMemoryCache _cache;

        //https://finnhub.io/api/v1/stock/symbol?exchange=US&token=[TOKEN_FINHUB]"
        private readonly string SymbolUrl = "https://finnhub.io/api/v1/stock/symbol";
        private readonly string Token = "[TOKEN_FINHUB]";
        public SymbolAgent(HttpClient client, IMemoryCache cache)
        {
            client.BaseAddress = new Uri(SymbolUrl);            
            _client = client;
            _cache = cache;
        }

        public async Task<IEnumerable<StockSymbol>> ListStockSymbols()
        {
            IEnumerable<StockSymbol> stockSymbols;
            string key = "ListStockSymbols";

            if (!_cache.TryGetValue(key, out stockSymbols))
            {
                var response = await _client.GetAsync($"?exchange=US&token={Token}");
                response.EnsureSuccessStatusCode();
                using var responseStream = await response.Content.ReadAsStreamAsync();
                stockSymbols = await JsonSerializer.DeserializeAsync<IEnumerable<StockSymbol>>(responseStream);

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                   .SetSlidingExpiration(TimeSpan.FromMinutes(60));

                _cache.Set(key, stockSymbols, cacheEntryOptions);                
            }

            return stockSymbols;
        }
    }
}
