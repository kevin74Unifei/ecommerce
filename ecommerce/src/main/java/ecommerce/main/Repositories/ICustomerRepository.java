package ecommerce.main.Repositories;

import ecommerce.main.Entities.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends MongoRepository<Customer, Integer> {
    public Customer findByEmail(String email);
}
