package com.scienceGateway.nineToFiveIt.repositories;
import com.scienceGateway.nineToFiveIt.model.Projects;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.junit.Test;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class addProjectRepositoryTest {
    @Autowired
    private com.scienceGateway.nineToFiveIt.repositories.AddProjectRepository addProjectRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Before
    public void setup(){
        mongoTemplate.dropCollection(Projects.class);
    }

    @After
    public void tearDown(){
        mongoTemplate.dropCollection(Projects.class);
    }


    @Test
    public void TestAddAndFindProject(){
        Projects project1=new Projects(
                "SGA",
                "9to5It",
                "10",
                "10",
                "250",
                "20",
                "Bloomington",
                "Computer Science",
                "http://sads"
            );

        Projects project2=new Projects(
                "ASG",
                "9to5It",
                "10",
                "10",
                "250",
                "20",
                "Bloomington",
                "Computer Science",
                "http://sads"
        );

        addProjectRepository.save(project1);
        addProjectRepository.save(project2);

        assertEquals(project1.getCompanyName(),addProjectRepository.findByProjectName("SGA").getCompanyName());
        assertEquals(project1.getCompanyName(),addProjectRepository.findByProjectName("ASG").getCompanyName());
        assertNull(addProjectRepository.findByProjectName("asd"));

    }
}
