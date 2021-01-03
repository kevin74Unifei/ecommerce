package ecommerce.main.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Category {
    @Transient
    @JsonIgnore
    public static final String SEQUENCE_NAME = "categories_sequence";

    @Id
    private long Id;
    private String Name;
    private Boolean Enabled;
}
