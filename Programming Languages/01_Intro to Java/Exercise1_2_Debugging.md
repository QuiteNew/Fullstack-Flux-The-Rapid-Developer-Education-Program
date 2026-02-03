# Debugging
Whether you are just getting started with Java, and you are new to IntelliJ idea, the first thing you need to learn is debbuging.
Knowing how to debbug your application is an essential skill for any Java developer. Here we cover best technicks to debbug Java applications in IntelliJ IDEA using an example application. 
Let's get right to it !!

## So why do we need debugging ?
Sometimes during execution of your appliacation, it behaved in a way it wasn't intended, and sometimes we know why this was, but other times it is not quite so clear. So in order to understand what's going on inside of your application, that's when we use the technik called debugging. So while we are looking inside of your application to see what's going on inside the code and what values the variables have hopefully to try to diagnose your problem and come up with a solution. 

## The way it works in Java
When your application starts up, and the Java Virtual Machine (JVM) you can start your application in debbug mode, which allows another Debugg proccess to attach itself to the JVM, and to see what's happening inside. This is useful not only to diagnose issue running inside your IDE, but it can also be used after deployment even if your application is runnign on the cloud for example, you can still attach debbug session to it. Here we will focus on the first scenario, when we've got an application running inside IntelliJ IDEA, using all the tools IntelliJ IDEA offers to make as simple as possible for us to debbug our application. In this class we will debug few examples in Java, and show how to use the debugger to debug some code 


## Key fundamentals of debugging

- **A break point**: a break point is where while we are running in debug mode the IDE will stop execution of our program at our break point and then we can kind of poke around and see that the state of our program is at that break point. So basically before that line of code is executed, we are going to have the IDE stop execution of the program, so if we run with the debug icon we will see what that does. 

- **Debug window**: We are used to normally see the console output which is the standard out, but in this case when running in debug mode we will see the debug window, which is saying that the state of our program is. 

- **"Step"** - which means we want to execute the next line of code and then see what happens. And in order to to that there are different arrows in the debug window. For example we can step over (the first arrow symbol) and that way we just went to the next line of code.


# Debugging exercises in Java using IntelliJ IDEA

## Example 1: Let's debug the following simple Java program 
Actually here we have a main class whose main method is doing very basic arithmetic with two integers A and B which are multiplied and whose product is compared
with another variable C and then printing out whether it is bigger or smaller.
```
int a = 2;
        int b = 5;
        int c = 11;

        int aTimesB = a * b;
        if (aTimesB > c){
            System.out.println("Bigger");
        } else {
            System.out.println("Smaller");
        }
```

**DEBUG FACTS: Debug wherever you can, when trying to figure out unexpected program behaviour** - That way we can see what value each variable is, so we can literally step through the program

**What can we notice while looking at this code ?** 
- **This program shouldn't have very buggs in it** - At first we think that we should always print smaller, and expect always to print smaller because 2 times 5 is 10, which is less than 11. So, if we double check that by running the code, we hit the smaller case.
- **But what if we change the c value to 10 ?** - we are trying to figure out why we are hitting print smaller as result instead of equal

**So what we might do here ?**
- **Add a print statement** - before the if codeline printing for example: "Debugg" and then print out aTimesB and then run the code to check what the print statement say, and that could work.
- **Or run this code through a debugger** - this way we are able literally step by step to follow the logic through our program, and to see our program behaviour based of the values of our variables

**How do we debug ?** 
- **Is it just by clicking the green little debugg icon within the IDE ?** - Many people just hit the little green bug but don't see any different results in their program.
- There are more steps to when running your program in debug mode.

**Debug STEPS** - What we do when we are debugging our code in debug mode ? In order to really debug our program customize the additional features in the IDE:
1. **Insert a break point** - Just click right next to the line number where we want the break point to start.
![image](https://github.com/user-attachments/assets/c6f9e948-fb03-4e09-80c5-5bcd667b945b)
   
3. **Run in debug mode by clicking the little bug symbol in the IDE**
4. **Step over** and see the state of our program from the debug window
![image](https://github.com/user-attachments/assets/34818bc7-e57a-482f-9c24-1f0236939b59)

6. **The little checkmark on the break point says that we did hit the break point** - the first line from that break point will be highlited meaning we are currently on that line, and next to it we can also see the variables set right now which are set when the codeline is executed, and until the execution of that codeline the debugger won't know about the a variable yet.
7. Next we **step over** - even though our break point was at line ```a=2``` we are now still breaking at line ```b=5```. From here we can see that our value of a is 2
![image](https://github.com/user-attachments/assets/1cb67df4-c82d-4e00-a37b-040b7558428f)

9. If **step over one more time** we see that now our value of b is set to 5
![image](https://github.com/user-attachments/assets/31d7c081-9a49-444b-b3c3-b6dc60c210cb)

11. If we **skip few times** we can see that next to the line ```int aTimesB = a * b;``` it says ```a:2,  b:5 and aTimesB:10```
![image](https://github.com/user-attachments/assets/69bec9a8-7ea3-4fdf-b235-cc1fdbe0a64b)

13. On the next skipping the **next highlighted line** is ```if (aTimesB > c)``` and next to it it says ```c:10, aTimesB:10``` telling us what next is going to happen (on the next skip we will hit the else block and print "Smaller").
14. Now that we know how the program would execute in that situation, we **rerun the debugger** (by clicking on green bug again) and then we will be back at where we just started back at line ```int a=2```
15. **Hit step over again** - the code will behave like the last time
16. In order to **see the program behaviour if a was a different value** - instead of changing the value of a, and then rerun the code or rerun the debugger, we set the values of the variables while the debugger is running by clicking on the little up arrow on the ```a:2``` and set the new value (let's say set value to 9)
![image](https://github.com/user-attachments/assets/31ae2588-b2e3-4f65-8a7c-e9e63761b007)

18. Now **step through the code again for a few times** and see now we hit the first branch ```aTimesB > c``` and thus print "Bigger". Beside every codeline we can see the newly set values for the variables, so we can see that now that value of a is 9 (meaning our product is 45 and thus greater than 10). Now that we know that we are going to hit the first statment, we go ahead and hit resume (on the left side bar on the play button on the debug window and now we print "Bigger").
![image](https://github.com/user-attachments/assets/61a11d21-2ce3-44f3-8353-1f6e5bbc163e)
![image](https://github.com/user-attachments/assets/08a682e9-11ac-4367-9ea5-e3e0df449736)

20. Next, we want to debug our code and look for when we are hitting the else case but in a case when really the value isn't smaller but it's equal. So, we are going to **add break point** at line "if (aTimesB > c)", and then right click on that break point and add a condition "aTimesB == c" - thus this break point will only get hit if the condition is true
![image](https://github.com/user-attachments/assets/9084dfa2-34c4-4dcf-af11-8648c8f5ddbe)

22. Next, debugging again in this case of the code - we have hit our first breakpoint as expected and since we don't want to step over each lines we are going to hit resume and we can see we are moved on the next breakpoint with all the variable values set on the lines above the second break point, and also we see we've hit our second break point and because our value of c and aTimesB are exactly the same (c:10, aTimesB: 10).
![image](https://github.com/user-attachments/assets/23351398-1d4a-402f-8df2-c47ec9dd6589)

24. And if rerun the debugger and then change the value of a to three, then on resume we see that we just hit the "Bigger" statement and we didn't hit the second break point.
25. This way we make break point conditional based off of the state of our program so that way we dont hit it every single time.
26. Next, if the first break point annoy us and we don't want to use it anymore but we want to generaly keep it in place - we right click on that and deselect the enabled meaning we have a break point which we can turn back on but it's not currently enabled, so if we rerun the debugger we directly hit the second conditional breakpoint because the two values are the same but skipp the first. 
![image](https://github.com/user-attachments/assets/a362493b-70a3-498d-af60-ccc69da2b6c2)


## Example 2: Use objects in debugger
So next, instead of primitives we will convert this to use some objects and demonstrate how to use objects in debugger. Here is some more code where we have Strings, and we are adding things into a list and we're printing the list. 
```
public class Main {
    public static void main(String[] args) {

        final List<String> myList = new ArrayList<>();
        myList.add("first");
        myList.add("second");
        myList.add("third");

        final List<String> secondList = new ArrayList<>();
        for(final String elem : myList){
            secondList.add(elem.substring(6));
        }

        System.out.println(secondList);
        
    }
}
```
## What is this code doing? Is there possibly some bug we can predict ?
By looking at this code we may see a bug immediately, or maybe we don't. After running we can see a bug: "String index out of bounds" exception which happens on the line  ```secondList.add(elem.substring(6))```. While looking at the string "first" we might pretty quickly draw the conclusion that the strings within myList are not long enough, but what if this wasn't that straight forward and we didn't see the contents of myList ?
![image](https://github.com/user-attachments/assets/cba9aba3-357b-41c8-a45c-fbbe6ead71d1)

## What can we do here: 
1. Print out myList (won't help us in much more complicated scenario)
2. Or **add in some break points** - so we can run this with the debugger and see what it looks like all
3. After **entering a debug mode**, and step to get through the code, now that we are in the for loop, next to the line highlighted "secondList.add(elem.substring(6))" we see all the active variables ```elem: "first", myList: size=3 , secondList: size=0``` (secondList currently doesn't have any elements in it because we haven't added anything).
![image](https://github.com/user-attachments/assets/e71e7f46-cbd2-4025-84c1-9d78643ae14d)

4. Also from the debug window down see all active variables with their values, and by clicking the little carrot we see the **whole structure and what the entire contents** of myList are: "first", "second" and "third", and we can just keep drilling down as to what the details of all this information is (really valuable because get down to pretty low level details about what our variables are doing and what state they're in). 
5. Immediately after adding this breakpoint if we run the debugger we can look through the contents in the debugger window so we can tell almost immediately why it would fail our check (way more useful than rerunning our code twice or ten times or whatever it is adding the log statement that tells us where our code is going wrong). 

## Conclusion: **It is faster and easier to use a debugger**
