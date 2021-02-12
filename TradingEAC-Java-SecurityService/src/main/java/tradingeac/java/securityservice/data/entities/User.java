package tradingeac.java.securityservice.data.entities;

import java.util.UUID;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import org.springframework.data.annotation.Id;

@Document(collection  = "Users")
public class User {      
    @Id
    private String id;
    public void setId(String value){
        id = value;
    }
    public String getId(){
        return id;
    }

    private int userId;
    public void setUserId(int value){
        userId = value;
    }
    public int getUserId(){
        return userId;
    }

    @PartitionKey
    private String userName;
    public void setUserName(String value){
        userName = value;
    }
    public String getUserName(){
        return userName;
    }

    private String password;
    public void setPassword(String value){
        password = value;
    }
    public String getPassword(){
        return password;
    }
}
