package ecommerce.main.Services;

import ecommerce.main.Entities.*;
import ecommerce.main.Model.OrderModel;
import ecommerce.main.Model.OrderedMealModel;
import ecommerce.main.Repositories.ICustomerRepository;
import ecommerce.main.Repositories.IMealRepository;
import ecommerce.main.Repositories.IOrderRepository;
import ecommerce.main.Validators.CommonValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private ICustomerRepository _customerRepository;
    private IMealRepository _mealRepository;
    private IOrderRepository _orderRepository;
    private CommonValidator _commonValidator;

    @Autowired
    public OrderService(ICustomerRepository _customerRepository, IMealRepository _mealRepository, IOrderRepository _orderRepository, CommonValidator _commonValidator) {
        this._customerRepository = _customerRepository;
        this._mealRepository = _mealRepository;
        this._orderRepository = _orderRepository;
        this._commonValidator = _commonValidator;
    }

    private void validateAddress(Address address) throws Exception {
        String errors = "";

        if(_commonValidator.isStringNullOrEmpty(address.getCountry()))
            errors += "Address - Country is empty";

        if(_commonValidator.isStringNullOrEmpty(address.getState()))
            errors += "Address - State is empty";

        if(_commonValidator.isStringNullOrEmpty(address.getCity()))
            errors += "Address - City is empty";

        if(_commonValidator.isStringNullOrEmpty(address.getStreet()))
            errors += "Address - Street is empty";

        if(_commonValidator.isStringNullOrEmpty(address.getPostalCode()))
            errors += "Address - Postal Code is empty";

        if(!_commonValidator.isStringNullOrEmpty(errors))
            throw new Exception(errors);
    }

    private void validatePayment(Payment payment) throws Exception {
        String errors = "";

        if(_commonValidator.isStringNullOrEmpty(payment.getCountry()))
            errors += "Payment - Country is empty";

        if(_commonValidator.isStringNullOrEmpty(payment.getPostalCode()))
            errors += "Payment - Postal Code is empty";

        if(_commonValidator.isStringNullOrEmpty(payment.getName()))
            errors += "Payment - Name is empty";

        if(_commonValidator.isStringNullOrEmpty(payment.getNumber()))
            errors += "Payment - Number is empty";

        if(_commonValidator.isStringNullOrEmpty(payment.getSecurityCode()))
            errors += "Payment - SecurityCode is empty";

        if(!_commonValidator.isStringNullOrEmpty(errors))
            throw new Exception(errors);
    }

    private Customer getCustomerValidated(long customerId) throws Exception {
        Optional<Customer> customer = _customerRepository.findById((int) customerId);
        if(customer.isEmpty())
            throw new Exception("Customer not found");

        return customer.get();
    }

    private ArrayList<Meal> getMealsValidated(ArrayList<OrderedMealModel> orderedMealsModel) throws Exception {
        String errors = "";
        ArrayList<Meal> meals = (ArrayList<Meal>) _mealRepository.findAllById(orderedMealsModel.stream().map(OrderedMealModel::getId).collect(Collectors.toList()));

        for(OrderedMealModel orderedMealModel: orderedMealsModel) {
            Meal meal = meals.stream().filter(filteredMeal -> filteredMeal.getId() == orderedMealModel.getId()).findFirst().orElse(null);
            if(meal == null)
                errors += "Meal " + orderedMealModel.getId() + " not found!";
            else if(meal.getAmount() < orderedMealModel.getAmount())
                errors += "Meal " + meal.getName() + " has only " + meal.getAmount() + " available. ";
            else{
                meal.setAmount(meal.getAmount() - orderedMealModel.getAmount());
            }
        }

        if(!_commonValidator.isStringNullOrEmpty(errors))
            throw new Exception(errors);

        return meals;
    }

    private void addOrder(Customer customer, ArrayList<Meal> meals, Address address, Payment payment, ArrayList<OrderedMealModel> orderedMealsModel){
        OrderCustomer orderCustomer = new OrderCustomer();
        orderCustomer.setId(customer.getId());
        orderCustomer.setName(customer.getName());

        ArrayList<OrderedMeal> orderedMeals = new ArrayList<>();
        meals.forEach(meal -> {
            OrderedMealModel orderedMealModel = orderedMealsModel.stream().filter(filteredMeal -> filteredMeal.getId() == meal.getId()).findFirst().orElse(null);
            OrderedMeal orderedMeal = new OrderedMeal();
            orderedMeal.setId(meal.getId());
            orderedMeal.setName(meal.getName());
            orderedMeal.setDescription(meal.getDescription());
            orderedMeal.setPrice(meal.getPrice());
            orderedMeal.setImage(meal.getImages().get(0));
            orderedMeal.setAmount(orderedMealModel.getAmount());
            orderedMeals.add(orderedMeal);
        });

        Order order = new Order();
        order.setAddress(address);
        order.setPayment(payment);
        order.setCustomer(orderCustomer);
        order.setOrderedMeals(orderedMeals);
        order.setCreationDate(new Date());
        order.setStatus("Created");

        _orderRepository.save(order);
    }

    //update customers address and payment with the one he used to order
    private void updateCustomer(Customer customer, Address address, Payment payment){
        customer.setAddress(address);
        customer.setPayment(payment);
        _customerRepository.save(customer);
    }

    //update meals amount
    private void updateMeals(ArrayList<Meal> meals){
        _mealRepository.saveAll(meals);
    }

    public void saveOrder(OrderModel model) throws Exception {
        validateAddress(model.getAddress());
        validatePayment(model.getPayment());
        Customer customer = getCustomerValidated(model.getCustomerId());
        ArrayList<Meal> meals = getMealsValidated(model.getOrderedMeals());

        addOrder(customer, meals, model.getAddress(), model.getPayment(), model.getOrderedMeals());
        updateCustomer(customer, model.getAddress(), model.getPayment());
        updateMeals(meals);
    }
}
