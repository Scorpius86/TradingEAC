package tradingeac.java.stockservice.agents;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import tradingeac.java.stockservice.models.CompanyProfile;
import tradingeac.java.stockservice.util.cache.GenericCache;

@Configuration
public class CompanyProfileAgent {
    private final String ProfileUrl = "https://finnhub.io/api/v1/stock/profile2";
    private final String Token = "[TOKEN_FINHUB]";

    private final WebClient _client;    
    private final GenericCache<String, CompanyProfile> _cache;
            
    public CompanyProfileAgent(WebClient.Builder webClientBuilder,GenericCache<String, CompanyProfile> cache) {
        _client = webClientBuilder.baseUrl(ProfileUrl).build();
        _cache = cache;
    }
    
    public Mono<CompanyProfile> getCompanyProfile(String symbol){        
        symbol = symbol.toUpperCase();
        String s = symbol;
        CompanyProfile companyProfile = _cache.get(symbol).orElse(null);

        if(companyProfile!=null){            
            return Mono.just(companyProfile);
        }else{
            return _client.get()
            .uri("?symbol={symbol}&token={Token}",symbol,Token)
            .retrieve()                                
            .bodyToMono(CompanyProfile.class)
            .flatMap((cp) -> {                            
                cp.setSymbol(s);
                _cache.put(s,cp);
                return Mono.just(cp);
            });
        }
    }

    public Flux<CompanyProfile> listCompanyProfiles(List<String> symbols)
    {
        return Flux.fromIterable(symbols)
        .parallel()
        .runOn(Schedulers.elastic())
        .flatMap(this::getCompanyProfile)
        .ordered((s1,s2) -> s1.getSymbol().compareTo(s2.getSymbol()));
    }
}
