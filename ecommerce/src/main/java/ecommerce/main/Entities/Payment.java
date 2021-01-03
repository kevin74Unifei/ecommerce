package ecommerce.main.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Payment {
    private Integer method;
    private String number;
    private String expirationDate;
    private String name;
    private String securityCode;
    private String country;
    private String postalCode;
}
