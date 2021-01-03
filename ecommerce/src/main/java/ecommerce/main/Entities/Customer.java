package ecommerce.main.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Customer {

    @Transient
    public static final String SEQUENCE_NAME = "customers_sequence";

    @Id
    private long id;
    private String name;
    private String email;
    private String phone;
    private String birthday;
    private String password;

    private Address address;
    private Payment payment;
}
