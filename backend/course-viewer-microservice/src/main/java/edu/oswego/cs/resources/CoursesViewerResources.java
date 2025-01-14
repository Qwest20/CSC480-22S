package edu.oswego.cs.resources;

import edu.oswego.cs.database.CourseInterface;
import org.bson.Document;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("professor")
public class CoursesViewerResources {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("courses")
    public Response viewAllCourses() {
        List<Document> courses = new CourseInterface().getAllCourses();
        return Response.status(Response.Status.OK).entity(courses).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("courses/{courseID}")
    public Response viewCourse(@PathParam("courseID") String courseID) {
        Document document = new CourseInterface().getCourse(courseID);
        return Response.status(Response.Status.OK).entity(document).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("students")
    public Response viewAllStudents() {
        List<Document> students = new CourseInterface().getAllStudents();
        return Response.status(Response.Status.OK).entity(students).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("students/{studentID}")
    public Response viewStudent(@PathParam("studentID") String studentID) {
        Document document = new CourseInterface().getStudent(studentID);
        return Response.status(Response.Status.OK).entity(document).build();
    }
}