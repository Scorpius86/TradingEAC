package tradingeac.java.priceservice.agents;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import tradingeac.java.priceservice.models.Quote;
import tradingeac.java.priceservice.util.cache.GenericCache;

@Configuration
public class QuoteAgent {
    private final String QuoteUrl = "https://finnhub.io/api/v1/quote";
    private final String Token = "[TOKEN_FINHUB]";

    private final WebClient _client;    
    private final GenericCache<String, Quote> _cache;
            
    public QuoteAgent(WebClient.Builder webClientBuilder,GenericCache<String, Quote> cache) {
        _client = webClientBuilder.baseUrl(QuoteUrl).build();
        _cache = cache;
    }
    

    public Mono<Quote> getQuote(String symbol){        
        symbol = symbol.toUpperCase();
        String s = symbol;
        Quote quote = _cache.get(symbol).orElse(null);

        if(quote!=null){            
            return Mono.just(quote);
        }else{
            return _client.get()
            .uri("?symbol={symbol}&token={Token}",symbol,Token)
            .retrieve()                                
            .bodyToMono(Quote.class)
            .flatMap((q) -> {                            
                q.setSymbol(s);        
                _cache.put(s,q);
                return Mono.just(q);
            });
        }
    }

    public Flux<Quote> listQuotes(List<String> symbols)
    {
        return Flux.fromIterable(symbols)
        .parallel()
        .runOn(Schedulers.elastic())
        .flatMap(this::getQuote)
        .ordered((s1,s2) -> s1.getSymbol().compareTo(s2.getSymbol()));
    }

}
