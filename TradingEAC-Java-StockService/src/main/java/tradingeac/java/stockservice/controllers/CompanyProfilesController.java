package tradingeac.java.stockservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tradingeac.java.stockservice.agents.CompanyProfileAgent;
import tradingeac.java.stockservice.models.CompanyProfile;

@RestController
public class CompanyProfilesController {
    private CompanyProfileAgent _companyProfileAgent;

    @Autowired
    public CompanyProfilesController(CompanyProfileAgent companyProfileAgent) {
        _companyProfileAgent = companyProfileAgent;
    }

    @GetMapping("/companyProfiles/{symbol}")
    public Mono<CompanyProfile> getCompanyProfile(@PathVariable(required=true,name="symbol") String symbol) {
        return _companyProfileAgent.getCompanyProfile(symbol);
    }
    @GetMapping("/companyProfiles")
    public Flux<CompanyProfile> listCompanyProfiles(@RequestParam(name = "symbols", required = false) List<String> symbols) {
        return _companyProfileAgent.listCompanyProfiles(symbols);
    }
}
