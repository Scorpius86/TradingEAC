using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TradingEAC.DotNet.PriceService.Models;

namespace TradingEAC.DotNet.PriceService.Agents
{
        //https://finnhub.io/api/v1/quote?symbol=AAPL&to
    public class QuoteAgent
    {ken=[TOKEN_FINHUB]"
        private readonly string QuoteUrl = "https://finnhub.io/api/v1/quote";
        private readonly string Token = "[TOKEN_FINHUB]";

        private readonly HttpClient _client;
        private IMemoryCache _cache;

        public QuoteAgent(HttpClient client, IMemoryCache cache)
        {
            client.BaseAddress = new Uri(QuoteUrl);
            _client = client;
            _cache = cache;
        }

        public async Task<Quote> GetQuote(string symbol)
        {
            symbol = symbol.ToUpper();
            Quote quote;

            if (!_cache.TryGetValue(symbol, out quote))
            {
                var response = await _client.GetAsync($"?symbol={symbol}&token={Token}");
                response.EnsureSuccessStatusCode();
                using var responseStream = await response.Content.ReadAsStreamAsync();
                quote = await JsonSerializer.DeserializeAsync<Quote>(responseStream);
                quote.symbol = symbol.ToUpper();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(1));

                _cache.Set(symbol, quote, cacheEntryOptions);
            }

            return await Task.FromResult(quote);
        }

        public async Task<IEnumerable<Quote>> ListQuotes(List<string> symbols)
        {
            List<Task<Quote>> tasks = new List<Task<Quote>>();
            List<Quote> quotes = new List<Quote>();

            symbols.ForEach(symbol =>
            {
                Task<Quote> task = Task<Quote>.Factory.StartNew(() => GetQuote(symbol).Result);
                tasks.Add(task);
            });

            Task.WaitAll(tasks.ToArray());

            tasks.ForEach(task =>
            {
                quotes.Add(task.Result);
            });

            return await Task.FromResult(quotes);
        }
    }
}
