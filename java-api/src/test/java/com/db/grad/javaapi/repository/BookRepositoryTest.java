package com.db.grad.javaapi.repository;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.AppService;
import com.db.grad.javaapi.service.BookService;
import com.db.grad.javaapi.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.db.grad.javaapi.model.Book;


import javax.persistence.OneToMany;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository br;
    @Autowired
    private UserRepository ur ;
    @Autowired
    private AppService as ;

    @Test
    public void testFindBooksByUserID() {
        // set
        User user = new User() ;
         // Set a user, get some books and assign them to user.
        user.setUserName("Mike");
        user.setPassword("pass");
        List<Book> allbooks = br.findAll() ;
        List<Book> books = allbooks.subList(0,3) ;
        user.setBooks(books);
        ur.save(user) ;

        // act
        int userID = 1 ;        // the desired ID
        Optional<User> optfoundUser = ur.findById(userID) ;
        User foundUser = new User() ;
        if(optfoundUser.isPresent()){
            foundUser= optfoundUser.get();
        }
        else{
            System.out.println("User not found!") ;
        }

        System.out.println("foundUser class=" + foundUser.getClass());
        System.out.println("Found user with name="+ foundUser.getUserName()) ;

        List<Book> users_books = foundUser.getBooks();
        for(Book ubook: users_books){
            System.out.println(ubook);
        }
        // assert
        // Assertions.assertArrayEquals(books, user_books);
        // Boolean equals = books.equals(users_books) ;
        // System.out.println("Equals =" + equals);
        System.out.println("User='"+foundUser.getUserName() + "' with userID='"
                + userID + "' is assigned books:") ;

        for (Book book : users_books) {
            System.out.println( "FOUNDBOOKS  ID: " + book.getId() + ",  Name: " + book.getBookName()
                            + "  object: " + book );
        }
        for (Book book : books) {
            System.out.println( "ACTUAL BOOKS  ID: " + book.getId() + ",  Name: " + book.getBookName()
                    + "  object: " + book );
        }

        List<Book> service_books = as.findBooksByUserID(userID) ;
        for(Book book: service_books) {
            System.out.println( "ACTUAL BOOKS  ID: " + book.getId() + ",  Name: " + book.getBookName()
                    + "  object: " + book );
        }
    }
}


