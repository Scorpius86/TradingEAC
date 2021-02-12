package tradingeac.java.priceservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tradingeac.java.priceservice.agents.QuoteAgent;
import tradingeac.java.priceservice.models.Quote;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class QuotesController {      
    private QuoteAgent _quoteAgent;

    @Autowired
    public QuotesController(QuoteAgent quoteAgent) {
        _quoteAgent = quoteAgent;
    }

    @GetMapping("/quotes/{symbol}")
    public Mono<Quote> getQuotes(@PathVariable(required=true,name="symbol") String symbol) {
        return _quoteAgent.getQuote(symbol);
    }
    @GetMapping("/quotes")
    public Flux<Quote> listQuotes(@RequestParam(name = "symbols", required = false) List<String> symbols) {
        return _quoteAgent.listQuotes(symbols);
    }
}
