package com.db.grad.javaapi.service;
import com.db.grad.javaapi.model.Book;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.User;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.List;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private BondService bondService ;
    @Autowired
    private UserService userService ;
    @Autowired
    private BookService bookService;
    @Autowired
    private AppService appService ;

    @Test
    public void redeemBondTest(){
        // SET
        // Init a bond and a user
        Bond bondToRedeem = new Bond() ;
        Bond bondInFuture = new Bond() ;
        Bond redeemedBond = new Bond() ;
        User user = new User() ;

        // Set a user, get some books and assign them to user.
        user.setUserName("Mike");
//        List<Book> allbooks = bookService.getAllBooks() ;
//        List<Book> books = allbooks.subList(0,3) ;
//        user.setBooks(books);
        user.setPassword("password");
        userService.save(user) ;

        // Set bonds' attributes
        bondToRedeem.setBondStatus("active");
        LocalDate aPastDate = LocalDate.of(2023,8, 1) ;
        bondToRedeem.setBondMaturityDate(aPastDate);

        bondInFuture.setBondStatus("active");
        LocalDate aFutureDate = LocalDate.of(2023,8, 15) ;
        bondInFuture.setBondMaturityDate(aFutureDate);

        redeemedBond.setBondStatus("redeemed");
        redeemedBond.setBondMaturityDate(aPastDate);


        // ACT & ASSERT
        assertEquals(appService.redeemBondById(redeemedBond.getId()), false) ;
        assertEquals(appService.redeemBondById(bondInFuture.getId()), false) ;
        assertEquals(appService.redeemBondById(bondToRedeem.getId()), true) ;
    }
}
