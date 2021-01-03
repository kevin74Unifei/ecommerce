package ecommerce.main.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "database_sequences")
public class DatabaseSequence {

    @Id @Getter @Setter
    private String id;
    @Getter @Setter
    private long seq;
}