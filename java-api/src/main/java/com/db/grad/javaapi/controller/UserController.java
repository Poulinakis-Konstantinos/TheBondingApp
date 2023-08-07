package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.model.Bond;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import com.db.grad.javaapi.service.AppService;
import com.db.grad.javaapi.config.JWTTokenGenerator;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Map;




@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JWTTokenGenerator tokenGenerator;
    private AppService as ;

    @Autowired
    public UserController(UserService userService, JWTTokenGenerator tokenGenerator, AppService as) {
        this.userService = userService;
        this.tokenGenerator = tokenGenerator;
        this.as = as;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the username or password is null
        if (user.getUserName().isEmpty() || user.getPassword().isEmpty()) {
            // Return 400 status code and error message if null
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username and password are required");
        }
        // Check if the username already exists
        if (userService.findByUsername(user.getUserName())!= null) {
            // Return 409 status code and error message if exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }
        // Save the user and generate the token
        userService.saveFirstUser(user);
        String token = tokenGenerator.generateToken(user.getUserName());
        // Return 201 status code and token if registration succeeds
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("userName");
        String password = loginData.get("password");

        if (userService.authenticateUser(username, password)) {
            // Return 200 status code and token if login succeeds
            return ResponseEntity.ok(tokenGenerator.generateToken(username));
        } else {
            // Return 401 status code and error message if login fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong username or password");
        }
    }
  
      @GetMapping("/RedeemBond")
    public Boolean redeemBond(Integer bondId){
        return as.redeemBondById(bondId) ;
    }

}
