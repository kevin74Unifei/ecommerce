package ecommerce.main.Services;

import ecommerce.main.Entities.Customer;
import ecommerce.main.Model.CustomerLoginModel;
import ecommerce.main.Model.CustomerModel;
import ecommerce.main.Repositories.ICustomerRepository;
import ecommerce.main.Validators.CommonValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private ICustomerRepository _customerRepository;
    @Autowired
    private CommonValidator _commonValidator;

    private void validate(CustomerModel customerModel) throws Exception {
        String errors = "";

        if(_commonValidator.isStringNullOrEmpty(customerModel.getName()))
            errors = "Name is empty; ";

        if(_commonValidator.isStringNullOrEmpty(customerModel.getEmail()))
            errors += "Email is empty; ";

        if(_commonValidator.isStringNullOrEmpty(customerModel.getPassword()))
            errors += "Password is empty; ";

        if(!_commonValidator.isStringNullOrEmpty(errors))
            throw new Exception(errors);
    }

    private Boolean checkForExistingCustomer(String email){
        Customer customer = _customerRepository.findByEmail(email);
        if(customer != null)
            return true;

        return false;
    }

    private Boolean checkForCustomerEmailChanged(Integer id, String email) throws Exception {
        Optional<Customer> customer = _customerRepository.findById(id);
        if(customer.isEmpty())
            throw new Exception("Customer not found");

        if(customer.get().getEmail().equals(email))
            return false;

        return true;
    }

    private Customer saveCustomer(CustomerModel customerModel){
        Customer customer = new Customer();
        customer.setId(customerModel.getId());
        customer.setName(customerModel.getName());
        customer.setEmail(customerModel.getEmail());
        customer.setPassword(customerModel.getPassword());
        customer.setAddress(customerModel.getAddress());
        customer.setPayment(customerModel.getPayment());

        return _customerRepository.save(customer);
    }

    public Customer save(CustomerModel customerModel) throws Exception{
        validate(customerModel);
        if(customerModel.getId() < 1) {
            if (checkForExistingCustomer(customerModel.getEmail()))
                throw new Exception("This email is already registered, please consider choosing another one");
        }else{
            if(checkForCustomerEmailChanged(customerModel.getId(), customerModel.getEmail()))
                throw new Exception("Email cannot be changed");
        }

        return saveCustomer(customerModel);
    }

    public Customer login(CustomerLoginModel customerModel) throws Exception {
        Customer customer = _customerRepository.findByEmail(customerModel.getEmail());

        if(customer == null)
            throw new Exception("Email Invalid");

        if(!customer.getPassword().equals(customerModel.getPassword()))
            throw new Exception ("Password Invalid");

        return customer;
    }
}
