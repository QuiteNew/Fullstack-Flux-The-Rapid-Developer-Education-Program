public class Dog extends Animal{

    public String type;
    private String color;

    private  int age;


    public Dog() {
    }

    private Dog(String type, String color, int age) {
        this.type = type;
        this.color = color;
        this.age = age;
    }

    public void display(){
        System.out.println("I am a dog");
    }

    public  void makeSound(){
        System.out.println("Bark bark");
    }
}
