public class DepartmentHead extends Professor implements Administrator {
    private  String departmentName;


    public DepartmentHead(String id, String name, String departmentName) {
        super(id, name);
        this.departmentName = departmentName;
    }

    // Administrator interface method

    @Override
    public void manageDepartment(String departmentName){
        this.departmentName = departmentName;
        System.out.println(getName() + "is now managing the " + departmentName + " department.");
    }

    // Override getRole to include "Department Head"
    @Override
    public String getRole(){
        return super.getRole() + ", Department Head";
    }

    // Additional method to display department
    public void displayDepartment() {
        System.out.println(getName() + " manages the" + departmentName + " department.");
    }
}

//DepartmentHead:
//Extends Professor, implements Administrator.
//Attributes:
//Inherits attributes from Professor
//departmentName
//Methods:
//Implement methods from Administrator and inherited interfaces.

