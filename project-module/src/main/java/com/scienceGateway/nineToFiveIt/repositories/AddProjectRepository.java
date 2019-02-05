package com.scienceGateway.nineToFiveIt.repositories;

import com.scienceGateway.nineToFiveIt.model.Projects;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddProjectRepository extends MongoRepository<Projects, Long> {

    Projects findByProjectId(Long id);

    Projects findByProjectName(String projectName);
}
