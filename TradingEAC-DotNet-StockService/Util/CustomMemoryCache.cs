using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradingEAC.DotNet.StockService.Util
{
    public class CustomMemoryCache
    {
        private IMemoryCache _cache;
        public CustomMemoryCache(IMemoryCache cache)
        {
            _cache = cache;
        }

        //public object Get(object key,Action action)
        //{
        //    var ts = _cache.GetOrCreate(key, entry =>
        //      {
        //          entry.SetSlidingExpiration(TimeSpan.FromMinutes(60));
        //          return action();
        //      });
        //}
    }
}
