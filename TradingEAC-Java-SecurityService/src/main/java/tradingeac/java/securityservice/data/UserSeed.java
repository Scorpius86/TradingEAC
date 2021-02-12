package tradingeac.java.securityservice.data;

import java.util.UUID;

import org.springframework.context.annotation.Configuration;

import tradingeac.java.securityservice.data.entities.User;
import tradingeac.java.securityservice.data.repository.UserRepository;

@Configuration
public class UserSeed {
    private final UserRepository _userRepository;

    public UserSeed(UserRepository userRepository) {
        _userRepository = userRepository;
    }

    public void Seed(){
        if(_userRepository.count()==0){
            User erick = new User(); 
            erick.setId(UUID.randomUUID().toString());
            erick.setUserId(1);
            erick.setUserName("Erick");
            erick.setPassword("Erick");

            User oscar = new User();
            oscar.setId(UUID.randomUUID().toString());
            oscar.setUserId(2);
            oscar.setUserName("Oscar");
            oscar.setPassword("Oscar");

            _userRepository.save(erick);
            _userRepository.save(oscar);
        }
    }
}
