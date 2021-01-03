package ecommerce.main.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.main.Entities.Order;
import ecommerce.main.Model.OrderGetModel;
import ecommerce.main.Model.OrderModel;
import ecommerce.main.Model.OrderResponseModel;
import ecommerce.main.Repositories.IOrderRepository;
import ecommerce.main.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(path = "/order", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

    @Autowired
    private OrderService _orderService;

    @Autowired
    private IOrderRepository _orderRepository;

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody String body){
        try{
            OrderResponseModel response = new OrderResponseModel();
            ObjectMapper mapper = new ObjectMapper();
            OrderModel orderModel = mapper.readValue(body, OrderModel.class);

            _orderService.saveOrder(orderModel);
            response.setMessage("success");
            
            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception ex){
            return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/getOrders")
    public ResponseEntity<Object> getOrders(@RequestBody String body){
        try{
            ObjectMapper mapper = new ObjectMapper();
            OrderGetModel orderGetModel = mapper.readValue(body, OrderGetModel.class);

            List<Order> orders = _orderRepository.findByCustomer_id(orderGetModel.getCustomerId());
            if(orders.isEmpty())
                throw new Exception("Orders not found");

            return new ResponseEntity<>(orders, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
