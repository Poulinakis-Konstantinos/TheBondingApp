package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserService {
    private UserRepository ur;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository ur, BCryptPasswordEncoder passwordEncoder) {
        this.ur = ur;
        this.passwordEncoder = passwordEncoder;
    }

    public void saveUser(User user) { ur.save(user) ;}

    public List<User> getAllUsers() {
        return ur.findAll();
    }

    public User findById(int userId){
        return ur.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public void save(User user) {
        ur.save(user);
    }

    public User addUserByUsername(String username) {
        User user = new User();
        user.setUserName(username);
        return ur.save(user);
    }

    public User findByUsername(String username) {
        return ur.findByUserName(username);
    }

    public boolean authenticateUser(String username, String password) {
        User user = ur.findByUserName(username);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }

    public void saveFirstUser(User user) {
        System.out.println(user.toString());
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        ur.save(user);
    }
}