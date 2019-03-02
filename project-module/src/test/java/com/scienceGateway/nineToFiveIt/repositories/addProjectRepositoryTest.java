package com.scienceGateway.nineToFiveIt.repositories;
import com.scienceGateway.nineToFiveIt.model.Projects;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.junit.Test;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
       deleteProject("SGASpring2019january1st");
       deleteProject("ASGSpring2019january1st");
    }

    @After
    public void tearDown(){
        deleteProject("SGASpring2019january1st");
        deleteProject("ASGSpring2019january1st");
    }


    public void deleteProject(String projectName) {
        mongoTemplate.remove(Query.query(Criteria.where("projectName").is(projectName)), Projects.class);
    }

    @Test
    public void TestAddAndFindProject(){
        Projects project1=new Projects(
                "SGASpring2019january1st",
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
                "ASGSpring2019january1st",
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

        assertEquals(project1.getCompanyName(),addProjectRepository.findByProjectName("SGASpring2019january1st").getCompanyName());
        assertEquals(project1.getCompanyName(),addProjectRepository.findByProjectName("ASGSpring2019january1st").getCompanyName());
        assertNull(addProjectRepository.findByProjectName("asd"));

    }
}
