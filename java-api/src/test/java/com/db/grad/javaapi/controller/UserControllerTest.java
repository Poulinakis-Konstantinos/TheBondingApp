package com.db.grad.javaapi.controller;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import com.db.grad.javaapi.config.JWTTokenGenerator;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.AppService;
import com.db.grad.javaapi.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JWTTokenGenerator tokenGenerator;

    @Mock
    private AppService appService;

    @InjectMocks
    private UserController userController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testRegisterUser() {
        User user = new User();
        user.setUserName("testuser");
        user.setPassword("testpassword");

        // Mock the behavior of the UserService and JWTTokenGenerator
        when(userService.findByUsername(user.getUserName())).thenReturn(null);
        when(tokenGenerator.generateToken(user.getUserName())).thenReturn("testtoken");

        ResponseEntity<String> responseEntity = userController.registerUser(user);

        // Verify the expected response status and token
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("testtoken", responseEntity.getBody());
    }

    @Test
    public void testRegisterUserUsernameExists() {
        User user = new User();
        user.setUserName("existinguser");
        user.setPassword("testpassword");

        // Mock the behavior of the UserService to return an existing user
        when(userService.findByUsername(user.getUserName())).thenReturn(user);

        ResponseEntity<String> responseEntity = userController.registerUser(user);

        // Verify the expected response status and error message
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Username already taken", responseEntity.getBody());
    }

    @Test
    public void testRegisterUserEmptyUsernameOrPassword() {
        User user = new User();
        user.setUserName(""); // Empty username
        user.setPassword("testpassword");

        ResponseEntity<String> responseEntity = userController.registerUser(user);

        // Verify the expected response status and error message
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Username and password are required", responseEntity.getBody());
    }

    @Test
    public void testLoginUserSuccess() {
        String username = "testuser";
        String password = "testpassword";

        Map<String, String> loginData = new HashMap<>();
        loginData.put("userName", username);
        loginData.put("password", password);

        // Mock the behavior of the UserService to authenticate the user
        when(userService.authenticateUser(username, password)).thenReturn(true);

        // Mock the behavior of the JWTTokenGenerator
        when(tokenGenerator.generateToken(username)).thenReturn("testtoken");

        ResponseEntity<String> responseEntity = userController.loginUser(loginData);

        // Verify the expected response status and token
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("testtoken", responseEntity.getBody());
    }

    @Test
    public void testLoginUserFailure() {
        String username = "testuser";
        String password = "wrongpassword";

        Map<String, String> loginData = new HashMap<>();
        loginData.put("userName", username);
        loginData.put("password", password);

        // Mock the behavior of the UserService to not authenticate the user
        when(userService.authenticateUser(username, password)).thenReturn(false);

        ResponseEntity<String> responseEntity = userController.loginUser(loginData);

        // Verify the expected response status and error message
        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals("Wrong username or password", responseEntity.getBody());
    }

    // Add more test cases for other methods in UserController
}
