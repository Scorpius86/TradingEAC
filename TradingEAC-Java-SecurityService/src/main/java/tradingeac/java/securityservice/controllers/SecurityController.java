package tradingeac.java.securityservice.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tradingeac.java.securityservice.data.UserSeed;
import tradingeac.java.securityservice.data.entities.User;
import tradingeac.java.securityservice.data.repository.UserRepository;

@RestController
public class SecurityController {    
    private final UserRepository _userRepository;

    public SecurityController(UserRepository userRepository,UserSeed userSeed) {
        _userRepository = userRepository;
        userSeed.Seed();
    }    

    @PostMapping("/security")
    public ResponseEntity<Boolean> validateUser(@RequestBody User user) {
        List<User> usersdb = _userRepository.findByUserName(user.getUserName());
        User userdb = usersdb.size()>0?usersdb.get(0):null;
        if (userdb !=null)
        {
            if(user.getPassword().compareTo(userdb.getPassword()) == 0)
            {
                return ResponseEntity.ok(true);
            }
            else
            {
                return ResponseEntity.ok(false);
            }
        }
        else
        {
            return ResponseEntity.ok(false);
        }
        
    }
}
