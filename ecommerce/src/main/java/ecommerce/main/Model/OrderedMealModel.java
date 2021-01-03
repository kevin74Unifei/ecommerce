package ecommerce.main.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderedMealModel {
    private Integer id;
    private Integer amount;
}
