package com.scienceGateway.nineToFiveIt.events;

import com.scienceGateway.nineToFiveIt.model.Projects;
import com.scienceGateway.nineToFiveIt.services.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class AddProjectListener extends AbstractMongoEventListener<Projects> {


    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public AddProjectListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Projects> event) {
        event.getSource().setProjectId(sequenceGenerator.generateSequence(Projects.SEQUENCE_NAME));
    }

}
