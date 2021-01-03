package ecommerce.main.Validators;

import ecommerce.main.Entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component("beforeCreateCustomerValidator")
public class CustomerValidator implements Validator {
    @Autowired
    private CommonValidator commonValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return Customer.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Customer customer = (Customer) target;
        if(commonValidator.isStringNullOrEmpty(customer.getName()))
            errors.rejectValue("name", "name.empty");

        if(commonValidator.isStringNullOrEmpty(customer.getEmail()))
            errors.rejectValue("email", "email.empty");

    }
}
