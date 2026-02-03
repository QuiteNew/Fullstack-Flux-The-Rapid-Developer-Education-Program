# Working with Github

GitHub is a website and cloud-based platform where we can store, manage, share code and work together with others by tracking and controlling changes to the code.

## Key fundamentals of GitHub

- **Repositories**: Represents centralized location that stores a collection of files and their revision history for maintaining the versions of development.

- **Branches**: A unique set of code changes with a unique name. When more than one person is working in the project and making changes, in order to encapsulate our changes (like adding a new feature or fixing a bug) we make a new branch.

- **Commits**: Records changes to one or more files in your branch, similar to saving edited file. Git assigns each commit a unique ID, that identifies: the specific change, time of made change and change creator.

- **Pull requests**: Making a pull request is making a proposal to merge changes made in one repository branch into another, typically from a feature branch into the main branch. Before integrating the changes into the main branch the proposed code changes can be reviewed and approved by collaborators.


## Where do we start?

- **Create an account on GitHub**

- **Learn how to post your work on GitHub using the key principles of collaborative working**
  
- **Learn how to download the code for your own use**


## Common "GitHub Flow" Operations

- **Initialize empty repository**: Use `git init`

- **Add changes in our working directory to the staging area**: Use `git add` to add changes in our working directory to staging area where we prepare a snapshot of our project’s current state before committing it to the repository. It tells Git what updates we want to include to a particular file in the next commit. However, changes are not actually recorded until running git commit.

- **Save the changes - and leave a specific message for the changes done**: `git commit -m `.

- **Define the remote repository**: `git remote add origin [repo-url]` and `git remote set-url origin [repo-url]` before push your code to the master branch of the remote repository defined with "origin" and -u let you point your current local branch to the remote master branch.

- **Upload content from local to remote repositorys**: `git push origin 'branch-name'` to send (or push) the commits from our local branch in our local Git repository to the remote repository. 

- **Download from existing remote repository**: `git clone [repo-url]`


As alternative to GitHub we can also use: Gitlab, Bitbucket, SourceForge and so on, but here we will stick on working with Github.


# Github exercises while working with Java

## Example 1: Upload your first Java project to Github

Following the github flow operations, create your Github repository and create a new simple Java "Hello world" project, which you will upload on the Github repository.

### Solution

**TO DO** STEPS:
- **Create an github account** by entering email, password and username

- **Verify our account** by entering code sent on email. 

- **Login** to our github account

- **Choose create repository** and give the repostory name in following way: "Firstname_Lastname_id".
  
**Following steps can include either integrated IntelliJ standard approach either terminal approach**, but because of admin rights simplicity, we will use the first integrated IntelliJ approach:


- **Create simple "Hello world !" Java project** by choosing Get from VCS:
  ![image](https://github.com/user-attachments/assets/f8fb5f23-d37e-4edc-aa18-6cd7de438d9f)


- **In the next window under url field enter the url of our remote git repo and click on clone**:
![image](https://github.com/user-attachments/assets/29c2454c-a613-4289-b5fa-43746f744afa)


- **Click trust project on the next alert window**:
![image](https://github.com/user-attachments/assets/423d08d7-cb78-42d3-9ee5-a247ee7805bd)


- **Next, right click on the project -> new -> module**:
![image](https://github.com/user-attachments/assets/b7ec318f-be72-4bc3-8f28-0c7d805c4978)


- **In the new module window, enter Lecture1 under name field** and left anything else as it is and click Create:
![image](https://github.com/user-attachments/assets/07c7a6df-edf4-4d61-a4e0-9c080622ab14)


- **Right click on the module Lecture1 -> new -> Module**:
![image](https://github.com/user-attachments/assets/defeb5b4-33b7-4c57-87ff-62c37aaec7f0)


- **In the new module window, enter Exercise1_HelloWorld under name field** and left anything else as it is and click Create:
![image](https://github.com/user-attachments/assets/2b7bfe75-59ce-4661-8136-5f0bd9e91691)


- **Go in file -> settings -> version control -> github and by clicking on the plus select Login with token, enter our github user with the generated token**:
![image](https://github.com/user-attachments/assets/dbf1220f-2390-4c93-b29f-fbe0f3e595d8)



- **In the token field enter the generated token from github and click Add account**:
  ![image](https://github.com/user-attachments/assets/b1593795-b6a9-4e2b-9693-4db16f53c011)



- **Next in order to make connection between IntelliJ and Github, we need token which github will generate for us by going to github account -> settings**:
  
![image](https://github.com/user-attachments/assets/33cf1ebb-4808-46b2-bafa-e46fc505d740)



- **From left bottom choose developer settings**:
![image](https://github.com/user-attachments/assets/d10af5d1-44c8-4757-bd06-40b57d752fe7)



- **Go under Personal access tokens -> Tokens (classic) -> Generate new token (classic)**:
![image](https://github.com/user-attachments/assets/5052c327-51cb-4b46-9b9f-f5cd9486382c)

![image](https://github.com/user-attachments/assets/ea1c90cf-3d37-400f-addf-29e07cd9d36d)



- **Set the proper checkbox fields for the new token (following this image) and after setting all properties click generate token**:
![image](https://github.com/user-attachments/assets/1648871a-a682-4036-be3e-8035b34b7d10)
![image](https://github.com/user-attachments/assets/a24725f1-1505-474a-a640-05de872c3be8)
![image](https://github.com/user-attachments/assets/741ce4c2-fcff-40e5-bf41-231c9e4511d9)




- **Copy and save the generated token in file, because we wont be able to see it again**:
![image](https://github.com/user-attachments/assets/4ef13825-c9ec-4164-a9a5-a390f7089735)



- **Set the copied generated token in the token field under Settings -> Version Control -> GitHub -> + Add GitHub account using token, after what we will see our github user added**:
![image](https://github.com/user-attachments/assets/8d973caf-988a-4317-a6c1-be19fdfca403)
![image](https://github.com/user-attachments/assets/0b480e2c-623f-4670-84a0-a6dac5d6d4ce)



- **Copy our remote github repo url**:
![image](https://github.com/user-attachments/assets/e8d20c45-b41c-43d5-af7e-77327d479b69)




- **Go under main menu Git -> Manage Remotes**:
![image](https://github.com/user-attachments/assets/a8ced045-ccbf-49a9-a91d-62a2f6ae5d82)

If you see your remote github repo url already added than just click OK (and move to the next step), and if don't see your remote git repo url, add it by clicking on the plus button, and than enter your name in the NAME field and your remote git repo url in the URL field and click OK:



- **Go under main menu -> Git commit**:
![image](https://github.com/user-attachments/assets/2761f572-11eb-4b7c-a3a4-1ee7097e7835)



- **On the commit window on the left side, check all the files to commit, add a commit message and click on Commit button**:
![image](https://github.com/user-attachments/assets/b0af41bd-bac9-491b-a2c0-631775e09d29)



- **Under main menu -> Git -> push**:
![image](https://github.com/user-attachments/assets/0149752a-2dff-4eee-b8a8-5c926f8b166f)

- **Note:** In the case of undefined remote repo url, you will see define origin in which case you click on it and set the copied repo url in the remote origin field under define remote.



- **Just review the commited files to push and then click on Push button**:
![image](https://github.com/user-attachments/assets/fd53ff80-511b-4108-8fdf-f6e1b65a27c7)



- **Choose between different accounts in case of multiple git accounts on same pc**:

![image](https://github.com/user-attachments/assets/5d02bda7-3f85-4c19-9c1e-8571805da876)


### Now that you've finished successfully creating your first HelloWorld project in IntelliJ, and that you uploaded on your private Github repository, now also need to share your private repository with the professor and with the demonstrator by going on the github repository, and then on Settings -> Collaborators and then click on Add people
![image](https://github.com/user-attachments/assets/5585b005-011c-470a-be8f-1acbdb0e9b9e)

- **And then in the Find people search bar enter mitovuacs and then click on Add mitovuacs to this repository, after that you will see that there is an invite pending to be accepted**:
![image](https://github.com/user-attachments/assets/48a5c42f-b420-4637-bc18-dbbd07df3e76)

- **And then in the Find people search bar again enter filkovaivana1 and then click on Add filkovaivana1 to this repository**
![image](https://github.com/user-attachments/assets/cd552205-83c2-4078-9277-4b998e853f3d)

- **After that you will see that there is an invite for filkovaivana1 pending to be accepted**:
![image](https://github.com/user-attachments/assets/370f5e5d-adf5-4c3a-9454-2a036b63a817)


### And that's it :). Congratulations, you successfully uploaded your first project on Github ! Hope you had some fun...


## Additional - terminal approach (recommend to use only if working on your own pc with admin access privileges)
- **After creating new repository** we see all commands required to push already existing and new repository (we follow the commands for creating new repository):
```
echo "# Programming-Languages" >> README.md
git init
git add README.md
git commit -m "This is my first commit, let's have some fun!"
git branch -M main
git remote add origin https://github.com/filkovaivana1/Programming-Languages.git
git push -u origin main
```

- **Create simple "Hello world !" Java project** which should look like:
```java
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }
    }
}
```

- **Open cmd and set our current working directory** to the project directory (or open terminal from your project in intelliJ):
```
cd [project_directory]
``` 

- **Initialize empty git repository locally** (if already not done while creating the Java project):
```
git init
```

- **Add main branch**:
```
git branch -M main
```

- **And set the remote origin** to be our remote repository (which means everything we push will go there):
```
git remote add origin https://github.com/filkovaivana1/Programming-Languages.git
```

- **Add our code in the local git repository**:
```
git add .
```

- **Commit our changes** with specific message according to the changes done:
```
git commit -m "This is my first commit, let's have some fun!"
```

- **Finaly push everything we commited on the remote git repository**
```
git push -u origin main
```

*Note: Pushing for the frist time may require some preauthorization

After successful preauthorization we continue pushing our changes and if everything as it should be, we get response message that last operation is done:

![image](https://github.com/user-attachments/assets/6a6afcb3-618a-4b89-a97c-d57d28a902fc)


## Example 2: Create a MD file
In our newly created repository, create 'README.md' and upload it to your github repository.

### Solution
- **Open cmd and set current working directory** to the project directory (or open terminal from your project in intelliJ):
```
cd project_directory
``` 

- **Create md file**:
```
echo "# Programming-Languages" >> README.md
```

- **Add our code in the local git repository**
```
git add .
```

- **Commit our changes**
```
git commit -m "Add README file"
```

- **Push everything commited on the remote git repository**
```
git push -u origin main
```

## DO NOT FORGET: to do REMOVE GIT USER STEPS at the end of each class
In case multiple git users using the same IntelliJ IDEA for git operations, while committing and pushing directly from IntelliJ a different user can be seen in the commit history log. In order to skip this potential problem in the future, at the end of each class:
### REMOVE GIT USER STEPS
- **Remove your Git user in IntelliJ IDEA by** going to following path **C:\Users\<USER_DIR>** where you'll find a file **.gitconfig** which you should open with any text editor and delete **the assigned values for name and email**. Since other students will also do all these instructions on the same pc, on the start on next class you may be required again to enter your name and email.  
- **Remove your remote repository url from remote origin** by going under main **menu -> Git -> Manage Remotes** and select the Origin which you used as your remote repository url and click on the minus icon to remove it. The same reverse prodecure for adding your remote git origin will be required to do on start on every new class (by going under menu -> Git -> Manage Remotes and add your remote repository url as remote Origin or this will automatially happen on committing pushing when you will be required to set the remote repo url in the remote origin field under define remote).    
- **Remove your git account under Version Control** by going under main **menu -> File -> Settings -> Version Control -> Github** and select your Github user and click on minus icon to delete it. The same reverse prodecure for adding your git user **with the already generated token** will be required on start on every new class (so keep in mind to remember where you saved your token).

### NOTE: Do not forget the file location where you saved your git token, because we will need it for all the next classes.   
