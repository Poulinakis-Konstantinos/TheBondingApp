package com.db.grad.javaapi.controller;


import com.db.grad.javaapi.config.JWTTokenVerifier;
import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.UserRepository;
import com.db.grad.javaapi.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;
import java.time.LocalDate;
import java.util.List;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BondController {



    private final JWTTokenVerifier tokenVerifier;
    private AppService s;

    @Autowired
    public BondController(AppService s, JWTTokenVerifier tokenVerifier)
    {
        this.s = s;
        this.tokenVerifier = tokenVerifier;
    }

//    @GetMapping
//    public User getUser(@RequestHeader("Authorization") String token) throws AuthenticationException, ResourceNotFoundException {
//        if (!tokenVerifier.verify(token)) {
//            throw new AuthenticationException();
//        }
//
//        String username = tokenVerifier.getUsername(token);
//        User user = s.findByUserName(username);
//        if (user == null) {
//            throw new ResourceNotFoundException();
//        }
//
//        return user;
//    }

    @GetMapping("/getAllBonds")
    public List<Bond> getAllBonds(){
        return s.getAllBonds();
    }

    @GetMapping("/getAllTrades")
    public List<Trade> getAllTrade(){
        return s.getAllTrades();
    }

    @GetMapping("/getAllBooks")
    public List<Book> getAllBooks(){
        return s.getAllBooks();
    }

    @GetMapping("/getRedeemedBonds")
    public List<Bond> getRedeemedBonds(@RequestHeader("Authorization") String token) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        return s.getRedeemedBonds(userId);
    }

    //These need userId param
    // USE OF THESE API LOOKS LIKE THIS: ./getBondsByUserId?userId=0
    @GetMapping("/getBondsByUserId")
    public List<Bond> getBondsByUserId(@RequestParam int userId) {
        return s.findBondsByUserId(userId);
    }

//
//    @GetMapping("/getTradesByBondIdAndUserId")
//    public List<Bond> getBondsByBondIdAndUserId(@RequestParam int bondId, @RequestParam int userId) {
//        return s.findBondsByBondIdAndUserId(bondId, userId);
//    }
//
//
//
//    // USE OF THESE API LOOKS LIKE THIS: ./getBondsIn5Days?date=2023-08-10&userId=1
    @GetMapping("/getBondsIn5Days")
    public List<Bond> findUserBondsWithMaturityDateInFiveDays(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @RequestParam int userId) {
        return s.findUserBondsWithMaturityDateInFiveDays(date, userId);
    }
    // USE OF THESE API LOOKS LIKE THIS: ./getBondsBefore5Days?date=2023-08-10
    @GetMapping("/getBondsBefore5Days")
    public List<Bond> findUserBondsWithMaturityDateFiveDaysBefore(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @RequestParam int userId) {
        return s.findUserBondsWithMaturityDateFiveDaysBefore(date, userId);
    }






    // USE OF THESE API LOOKS LIKE THIS: ./getBondsByBookId?bookId=0
    @GetMapping("/getBondsByBookId")
    public List<Bond> getBondsByBookId(@RequestParam int bookId) {
        return s.findBondsByBookId(bookId);
    }

//    // USE OF THESE API LOOKS LIKE THIS: ./getBondsIn5Days?date=2023-08-10
//    @GetMapping("/getBondsIn5Days")
//    public List<Bond> findBondsWithMaturityDateInFiveDays(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
//        return s.findBondsWithMaturityDateInFiveDays(date);
//    }
//    // USE OF THESE API LOOKS LIKE THIS: ./getBondsBefore5Days?date=2023-08-10
//    @GetMapping("/getBondsBefore5Days")
//    public List<Bond> findBondsWithMaturityDateFiveDaysBefore(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
//        return s.findBondsWithMaturityDateFiveDaysBefore(date);
//    }





    //  curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=newUser123" http://localhost:8080/api/addUserByName
    @PostMapping("/addUserByName")
    public ResponseEntity<User> addUserByUsername(@RequestParam String username) {
        User newUser = s.addUserByName(username);
        return ResponseEntity.ok(newUser);
    }


    // curl -X POST -H "Content-Type: application/json" -d "[1, 2, 3]" http://localhost:8080/api/users/1/assignBooks
    @PostMapping("/users/{userId}/assignBooks")
    public ResponseEntity<Void> assignBooksToUser(
            @PathVariable int userId,
            @RequestBody List<Integer> bookIds) {
        s.assignBooksToUser(userId, bookIds);
        return ResponseEntity.ok().build();
    }




//    test
    @GetMapping("/getMyBooks")
    public List<Book> getMyBooks(@RequestHeader("Authorization") String token) throws AuthenticationException, ResourceNotFoundException {
        User user = s.findUserById(unpackUserId(token));
        return user.getBooks();
    }


    @GetMapping("/getMyBonds")
    public List<Bond> getMyBonds(@RequestHeader("Authorization") String token) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        return s.findBondsByUserId(userId);
    }

    @GetMapping("/getMyTradesByBondId")
    public List<Trade> getBondsByBondIdAndUserId(@RequestHeader("Authorization") String token, @RequestParam int bondId) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        return s.findTradesByBondIdAndUserId(bondId, userId);
    }



    //    // USE OF THESE API LOOKS LIKE THIS: ./getMyBondsIn5Days?date=2023-08-10
    @GetMapping("/getMyBondsIn5days")
    public List<Bond> findMyBondsWithMaturityDateInFiveDays(@RequestHeader("Authorization") String token, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        return s.findUserBondsWithMaturityDateInFiveDays(date, userId);
    }
    // USE OF THESE API LOOKS LIKE THIS: ./getMyBondsBefore5Days?date=2023-08-10
    @GetMapping("/getMyBondsBefore5Days")
    public List<Bond> findMyBondsWithMaturityDateFiveDaysBefore(@RequestHeader("Authorization") String token, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        return s.findUserBondsWithMaturityDateFiveDaysBefore(date, userId);
    }


    @PostMapping("/users/addToMyBooks")
    public ResponseEntity<Void> assignBooksToUser(
            @RequestHeader("Authorization") String token,
            @RequestBody List<Integer> bookIds) throws AuthenticationException, ResourceNotFoundException {
        int userId = unpackUserId(token);
        s.addBooksToUser(userId, bookIds);
        return ResponseEntity.ok().build();
    }

    private int unpackUserId(String token) throws ResourceNotFoundException, AuthenticationException {
        if (!tokenVerifier.verify(token)) {
            throw new AuthenticationException();
        }

        String usernameFromToken = tokenVerifier.getUsername(token);
        User user = s.findByUserName(usernameFromToken);
        if (user == null) {
            throw new ResourceNotFoundException();
        }

        return user.getId();
    }
}
