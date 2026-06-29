package com.example.courseplatform.dto;

public class EnrollmentRequestDto {
    private Long instructorId;
    private Long courseId;

    public EnrollmentRequestDto() {
    }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
}