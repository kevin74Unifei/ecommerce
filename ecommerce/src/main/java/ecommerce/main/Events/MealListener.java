package ecommerce.main.Events;

import ecommerce.main.Entities.Meal;
import ecommerce.main.Services.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class MealListener extends AbstractMongoEventListener<Meal> {
    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public MealListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Meal> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGenerator.generateSequence(Meal.SEQUENCE_NAME));
        }
    }
}
