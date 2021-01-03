package ecommerce.main.Repositories;

import ecommerce.main.Entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Category", path = "category")
public interface ICategoryRepository extends MongoRepository<Category, Integer> {
}
