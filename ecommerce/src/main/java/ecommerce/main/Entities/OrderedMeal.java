package ecommerce.main.Entities;

import lombok.Data;

@Data
public class OrderedMeal {
    private Long id;
    private String name;
    private String description;
    private Integer amount;
    private Double price;
    private String image;
}
