package com.scienceGateway.nineToFiveIt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "project")
public class Projects {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    long projectId;

    @Indexed(unique = true)
    String projectName;

    String companyName;
    String numberOfPpl;
    String numberOfHours;
    String payPerHour;
    String projectDescription;
    String projectLocation;
    String projectDepartment;
    String projectLink;

    public Projects(String projectName, String companyName, String numberOfPpl, String numberOfHours, String payPerHour, String projectDescription, String projectLocation, String projectDepartment, String projectLink) {
        this.projectName = projectName;
        this.companyName = companyName;
        this.numberOfPpl = numberOfPpl;
        this.numberOfHours = numberOfHours;
        this.payPerHour = payPerHour;
        this.projectDescription = projectDescription;
        this.projectLocation = projectLocation;
        this.projectDepartment = projectDepartment;
        this.projectLink = projectLink;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setNumberOfPpl(String numberOfPpl) {
        this.numberOfPpl = numberOfPpl;
    }

    public void setNumberOfHours(String numberOfHours) {
        this.numberOfHours = numberOfHours;
    }

    public void setPayPerHour(String payPerHour) {
        this.payPerHour = payPerHour;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public void setProjectLocation(String projectLocation) {
        this.projectLocation = projectLocation;
    }

    public void setProjectDepartment(String projectDepartment) {
        this.projectDepartment = projectDepartment;
    }

    public void setProjectLink(String projectLink) {
        this.projectLink = projectLink;
    }

    public long getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getCompanyName() { return companyName;  }

    public String getNumberOfPpl() {
        return numberOfPpl;
    }

    public String getNumberOfHours() {
        return numberOfHours;
    }

    public String getPayPerHour() {
        return payPerHour;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public String getProjectLocation() {
        return projectLocation;
    }

    public String getProjectDepartment() {
        return projectDepartment;
    }

    public String getProjectLink() {
        return projectLink;
    }

}
