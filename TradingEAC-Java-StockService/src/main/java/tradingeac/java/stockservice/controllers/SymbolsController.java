package tradingeac.java.stockservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import tradingeac.java.stockservice.agents.SymbolAgent;
import tradingeac.java.stockservice.models.StockSymbol;

@RestController
public class SymbolsController {
    private SymbolAgent _symbolAgent;

    @Autowired
    public SymbolsController(SymbolAgent symbolAgent) {
        _symbolAgent = symbolAgent;
    }

    @GetMapping("/symbols")
    public Flux<StockSymbol> listSymbols() {
        return _symbolAgent.listStockSymbols();
    }
}
