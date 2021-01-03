package ecommerce.main.Validators;

import org.springframework.stereotype.Component;

@Component
public class CommonValidator {

    public boolean isStringNullOrEmpty(String input) {
        return (input == null || input.trim().length() == 0);
    }

    public boolean isMoneyValid(Double input){
        return input < 0;
    }

    public boolean isNumberValid(Integer input){
        return input < 0;
    }
}
