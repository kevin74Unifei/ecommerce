package ecommerce.main.Events;

import ecommerce.main.Entities.Order;
import ecommerce.main.Services.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class OrderListener extends AbstractMongoEventListener<Order> {
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Order> event){
        if(event.getSource().getId() < 1){
            event.getSource().setId(sequenceGeneratorService.generateSequence(Order.SEQUENCE_NAME));
        }
    }
}
