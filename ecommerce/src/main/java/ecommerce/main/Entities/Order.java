package ecommerce.main.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Data
@Document
public class Order {

    @Transient
    public static final String SEQUENCE_NAME = "order_sequence";

    @Id
    private long id;
    private Date creationDate;
    private Address address;
    private Payment payment;
    private OrderCustomer customer;
    private String status;
    private Date updateDate;
    private ArrayList<OrderedMeal> orderedMeals;
}
