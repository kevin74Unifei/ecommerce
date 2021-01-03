package ecommerce.main.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {
    private String street;
    private String complement;
    private String postalCode;
    private String city;
    private String state;
    private String country;
}
