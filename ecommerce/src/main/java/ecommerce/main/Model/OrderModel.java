package ecommerce.main.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ecommerce.main.Entities.Address;
import ecommerce.main.Entities.Payment;
import lombok.Data;

import java.util.ArrayList;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderModel {
    private Address address;
    private Payment payment;
    private long customerId;
    private ArrayList<OrderedMealModel> orderedMeals;
}
