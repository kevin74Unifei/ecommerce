package ecommerce.main.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document
public class Meal {
    @Transient
    public static final String SEQUENCE_NAME = "meals_sequence";

    @Id
    private long id;
    private String name;
    private Integer category;//todo: an object with name and id
    private Integer amount;
    private Double price;
    private Double promotionPrice;
    private Integer daysToExpire;
    private String description;
    private String[] instructions;
    private ArrayList<String> images; //todo: change to handle pictures
    private String[] scores; //todo: create a score entity
    private Boolean enabled;
}
