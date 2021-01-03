package ecommerce.main.Repositories;

import ecommerce.main.Entities.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMealRepository extends MongoRepository<Meal, Integer> {
}
