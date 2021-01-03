package ecommerce.main.Repositories;

import ecommerce.main.Entities.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderRepository extends MongoRepository<Order, Long> {
    public List<Order> findByCustomer_id(long id);
}
