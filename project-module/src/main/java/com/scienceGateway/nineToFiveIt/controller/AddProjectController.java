package com.scienceGateway.nineToFiveIt.controller;

import com.scienceGateway.nineToFiveIt.model.Projects;
import com.scienceGateway.nineToFiveIt.repositories.AddProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class AddProjectController {
    @Autowired
    AddProjectRepository addProjectRepository;

    @RequestMapping(value = "/addProjects", method = RequestMethod.POST)
    public ResponseEntity addProject(@RequestBody Projects project){

       // Projects project=new Projects(request.getParameter("projectId"),"9to5It",request.getParameter("companyName"),10,250,20,"adasdsda","bng","CS","http://sads");

//        System.out.println(project.getCompanyName());
//		  System.out.println(project.getNumberOfHours());    	
//        System.out.println(project.getProjectId());

        if(project.getProjectName()== "" ||
            project.getCompanyName()== ""||
            project.getNumberOfHours()== "" ||
            project.getNumberOfPpl()=="" ||
            project.getPayPerHour() == "" ||
            project.getProjectDepartment() == "" ||
            project.getProjectDescription() == ""||
            project.getProjectLink()=="" ||
            project.getProjectLocation()=="") {
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }

        try{
            addProjectRepository.save(new Projects( project.getProjectName(),
                    project.getCompanyName(),
                    project.getNumberOfPpl(),
                    project.getNumberOfHours(),
                    project.getPayPerHour(),
                    project.getProjectDescription(),
                    project.getProjectLocation(),
                    project.getProjectDepartment(),
                    project.getProjectLink()
            ));
        }
        catch (DuplicateKeyException e1){ //|| MongoWriteException e){
           // System.out.println(HttpStatus.CONFLICT);
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
