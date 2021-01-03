package ecommerce.main.Model;

import lombok.Data;

@Data
public class CustomerModel {
    private Integer id;
    private String name;
    private String email;
    private String password;
}