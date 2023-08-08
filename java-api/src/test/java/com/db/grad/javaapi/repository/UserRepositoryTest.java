package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List ;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository ur ;
    @Autowired
    private BookRepository br;

    @Test
    public void testAddUser(){
        // set
        User user = new User() ;

        // act
        user.setUserName("Mike");
        user.setPassword("pass");
        List<Book> books = br.findAll() ;
        for(Book book: books) {
            System.out.println("A book list : " + book);
        }
        user.setBooks(books.subList(0,3));

        System.out.println("All users :" + ur.findAll() ) ;
        ur.save(user) ;

        // assert
        System.out.println(ur.findAll());
        System.out.println("Total users in database: " + ur.count());
        System.out.println("User books : " + user.getBooks());
    }
}
