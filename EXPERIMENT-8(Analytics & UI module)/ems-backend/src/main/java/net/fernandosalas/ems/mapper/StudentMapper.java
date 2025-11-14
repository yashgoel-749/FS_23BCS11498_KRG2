package net.fernandosalas.ems.mapper;
import net.fernandosalas.ems.dto.DepartmentDto;
import net.fernandosalas.ems.dto.StudentDto;
import net.fernandosalas.ems.entity.Department;
import net.fernandosalas.ems.entity.Student;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student) {
        StudentDto studentDto = new StudentDto();
        studentDto.setId(student.getId());
        studentDto.setFirstName(student.getFirstName());
        studentDto.setLastName(student.getLastName());
        studentDto.setEmail(student.getEmail());
        
        if (student.getDepartment() != null) {
            Department department = student.getDepartment();
            studentDto.setDepartmentId(department.getId());
            DepartmentDto departmentDto = new DepartmentDto();
            departmentDto.setId(department.getId());
            departmentDto.setDepartmentName(department.getDepartmentName());
            departmentDto.setDepartmentDescription(department.getDepartmentDescription());
            studentDto.setDepartment(departmentDto);
        }
        
        return studentDto;
    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
        return student;
    }
}
