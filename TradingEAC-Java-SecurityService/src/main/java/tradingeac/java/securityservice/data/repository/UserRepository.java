package tradingeac.java.securityservice.data.repository;

import java.util.List;

import com.microsoft.azure.spring.data.cosmosdb.repository.CosmosRepository;

import org.springframework.stereotype.Repository;
import tradingeac.java.securityservice.data.entities.User;

@Repository
public interface UserRepository extends CosmosRepository<User, String> {
    List<User> findByUserName(String userName);    
}
