package ecommerce.main.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.main.Entities.Customer;
import ecommerce.main.Model.CustomerLoginModel;
import ecommerce.main.Model.CustomerModel;
import ecommerce.main.Model.CustomerResponseModel;
import ecommerce.main.Repositories.ICustomerRepository;
import ecommerce.main.Services.CustomerService;
import ecommerce.main.Util.Constants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Log
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/customer", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerController {

    @Autowired
    private CustomerService _customerService;

    @Autowired
    private ICustomerRepository _customerRepository;

    private String getJWTToken(String username) {
        String secretKey = "mySecretKey";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        String token = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Constants.TOKEN_EXPIRES_IN))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bearer " + token;
    }

    private CustomerResponseModel getResponse(Customer customer){
        CustomerResponseModel customerResponseModel = new CustomerResponseModel();
        customerResponseModel.setToken(getJWTToken(customer.getEmail()));
        customerResponseModel.setExpiresIn(Constants.TOKEN_EXPIRES_IN);
        customerResponseModel.setEmail(customer.getEmail());
        customerResponseModel.setPassword(customer.getPassword());
        customerResponseModel.setName(customer.getName());
        customerResponseModel.setId(customer.getId());

        return customerResponseModel;
    }

    private CustomerResponseModel getLoggedResponse(String email){
        CustomerResponseModel customerResponseModel = new CustomerResponseModel();
        customerResponseModel.setEmail(email);
        return customerResponseModel;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody String body){
        try{
            ObjectMapper mapper = new ObjectMapper();
            CustomerLoginModel customerModel = mapper.readValue(body, CustomerLoginModel.class);
            Customer customer = _customerService.login(customerModel);

            return ResponseEntity.ok(getResponse(customer));
        }catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody String body){
        try{
            ObjectMapper mapper = new ObjectMapper();
            CustomerModel customerModel = mapper.readValue(body, CustomerModel.class);
            Customer customer = _customerService.save(customerModel);

            return ResponseEntity.ok(getResponse(customer));
        }catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Object> save(@RequestBody String body){
        try{
            ObjectMapper mapper = new ObjectMapper();
            CustomerModel customerModel = mapper.readValue(body, CustomerModel.class);
            Customer customer = _customerService.save(customerModel);

            return ResponseEntity.ok(getLoggedResponse(customer.getEmail()));
        }catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/getByEmail")
    public ResponseEntity<Object> getCustomerByEmail(@RequestBody String body){
        try{
            ObjectMapper mapper = new ObjectMapper();
            CustomerModel customerModel = mapper.readValue(body, CustomerModel.class);
            Customer customer = _customerRepository.findByEmail(customerModel.getEmail());
            if(customer == null)
                throw new Exception("Customer not found");

            return new ResponseEntity<>(customer, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
