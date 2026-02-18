void main(String[] args) {

  Scanner scanner = new Scanner(System.in);
  List<Book> books = new ArrayList<>();
  List<AdventureBook> advBooks = new ArrayList<>();
  List<SFBook> sfBooks = new ArrayList<>();
  int input = 0;
  boolean exit = false;

  while (true) {
      System.out.println("Choose sth: ");
      System.out.println("1 - Add SF Book");
      System.out.println("2 - Add adv book");
      System.out.println("3 - List all books");
      System.out.println("4 - Get oldest book");
      System.out.println("5 - Get most expensive book");
      System.out.println("6 - Get AVG price of all books");
      System.out.println("7 - Exit");

      try{
          input = Integer.parseInt(scanner.nextLine());

          switch (input) {

              case 1:
                  System.out.println("Enter SF title: ");
                  String title = scanner.nextLine();
                  System.out.println("Enter SF author: ");
                  String author = scanner.nextLine();
                  System.out.println("Enter SF price: ");
                  double price = Double.parseDouble(scanner.nextLine());
                  System.out.println("Enter SF language: ");
                  String language = scanner.nextLine();
                  System.out.println("Enter SF pub year: ");
                  int publishYear = Integer.parseInt(scanner.nextLine());
                  System.out.println("It is bestseller: ");
                  boolean bestSeller = Boolean.parseBoolean(scanner.nextLine());
                  SFBook sfBook = new SFBook(title, author, price, language, publishYear, bestSeller);
                  sfBooks.add(sfBook);
                  break;

              case 2:
                  System.out.println("Enter ADV title: ");
                  String title1 = scanner.nextLine();
                  System.out.println("Enter ADV author: ");
                  String author1 = scanner.nextLine();
                  System.out.println("Enter ADV price: ");
                  double price1 = Double.parseDouble(scanner.nextLine());
                  System.out.println("Enter ADV language: ");
                  String language1 = scanner.nextLine();
                  System.out.println("Enter ADV pub year: ");
                  int publishYear1 = Integer.parseInt(scanner.nextLine());
                  System.out.println("It is children book: ");
                  boolean childrenBook = Boolean.parseBoolean(scanner.nextLine());
                  AdventureBook advBook = new AdventureBook(title1, author1, price1, language1, publishYear1, childrenBook);
                  advBooks.add(advBook);
                  break;
              case 3:
                  books = Stream.concat(sfBooks.stream(), advBooks.stream()).collect(Collectors.toList());
                  books.stream().forEach(book -> book.printAttributes());
                  break;
              case 4:
                  System.out.println("Oldest book: ");
                  books = Stream.concat(sfBooks.stream(), advBooks.stream()).collect(Collectors.toList());
                  books.stream().min(Comparator.comparingInt(book ->
                  { if (book instanceof AdventureBook) {
                      return ((AdventureBook) book).getPublishYear();
                  } else {
                      return ((SFBook) book).getPublishYear();
                  }
                  })).ifPresent(book -> book.printAttributes());
                  break;
              case 5:
                  System.out.println("Most expensive book: ");
                  books = Stream.concat(sfBooks.stream(), advBooks.stream()).collect(Collectors.toList());
                  books.stream().max(Comparator.comparingDouble(book -> book.getPrice())).ifPresent(book -> book.printAttributes());
                  break;
              case 6:
                  System.out.println("Find AVG price: ");
                  books = Stream.concat(sfBooks.stream(), advBooks.stream()).collect(Collectors.toList());
                  System.out.println(books.stream().collect(Collectors.averagingDouble(book -> book.getPrice())));
                  break;
              case 7:
                  System.out.println("Exiting program... ");
                  exit = true;
                  break;
              default:
                  System.out.println("Invalid input ");
          }

          if (exit) {
              break;
          }
      } catch (NumberFormatException e) {}

  }
}

