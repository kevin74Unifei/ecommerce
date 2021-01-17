package ecommerce.main.Model;

import ecommerce.main.Entities.Address;
import ecommerce.main.Entities.Payment;
import lombok.Data;

@Data
public class CustomerResponseModel {
    private Long Id;
    private String Email;
    private String Password;
    private String Name;
    private String Token;
    private Integer ExpiresIn;
    private Address Address;
    private Payment Payment;
}
