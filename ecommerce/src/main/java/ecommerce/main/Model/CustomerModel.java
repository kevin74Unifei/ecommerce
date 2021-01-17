package ecommerce.main.Model;

import ecommerce.main.Entities.Address;
import ecommerce.main.Entities.Payment;
import lombok.Data;

@Data
public class CustomerModel {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Address address;
    private Payment payment;
}