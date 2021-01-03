package ecommerce.main.Model;

import lombok.Data;

@Data
public class CustomerResponseModel {
    private Long Id;
    private String Email;
    private String Password;
    private String Name;
    private String Token;
    private Integer ExpiresIn;
}
