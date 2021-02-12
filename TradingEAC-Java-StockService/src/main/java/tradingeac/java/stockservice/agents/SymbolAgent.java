package tradingeac.java.stockservice.agents;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tradingeac.java.stockservice.models.StockSymbol;
import tradingeac.java.stockservice.util.cache.GenericCache;

@Configuration
public class SymbolAgent {
    private final String SymbolUrl = "https://finnhub.io/api/v1/stock/symbol";
    private final String Token = "[TOKEN_FINHUB]";

    private final WebClient _client;    
    private final GenericCache<String, List<StockSymbol>> _cache;
            
    public SymbolAgent(WebClient.Builder webClientBuilder) {
        _client = webClientBuilder.baseUrl(SymbolUrl).build(); 
        _cache = new GenericCache<String, List<StockSymbol>>(360000L);
    }
    
    public Flux<StockSymbol> listStockSymbols()
    {
        String key = "ListStockSymbols";        
        List<StockSymbol> stockSymbols = _cache.get(key).orElse(null);
        ParameterizedTypeReference<List<StockSymbol>> typeReference =  new ParameterizedTypeReference<List<StockSymbol>>() {};

        if(stockSymbols != null){
            return Mono.just(stockSymbols).flatMapMany(Flux::fromIterable);            
        }else{
            return _client.get()
            .uri("?exchange=US&token={Token}",Token)
            .retrieve()            
            .bodyToMono(typeReference)
            .map(sb->{
                _cache.put(key, sb);
                return sb;
            })
            .flatMapMany(Flux::fromIterable);
        }
    }
}
