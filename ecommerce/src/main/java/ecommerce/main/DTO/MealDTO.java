package ecommerce.main.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MealDTO {
    private Integer id;
    private String name;
    private String description;
    private Integer category;
    private Integer amount;
    private Double price;
    private Integer daysToExpire;
}
