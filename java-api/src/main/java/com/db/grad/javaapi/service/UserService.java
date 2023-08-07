package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondRepository;
import com.db.grad.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class UserService {
  
    private UserRepository ur;
    private final BCryptPasswordEncoder passwordEncoder;
    private BondRepository br;
    private final Lock redeemLock = new ReentrantLock() ;

    @Autowired
    public UserService(UserRepository ur, BCryptPasswordEncoder passwordEncoder,  BondRepository br) {
        this.ur = ur;
        this.passwordEncoder = passwordEncoder;
        this.br = br;

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


    public Boolean redeemBond(Bond bondToRedeem) {
        redeemLock.lock();  //Acquire the lock - other users can't interfere
        try {
            if (bondToRedeem.getBondStatus().equals("redeemed")) {
                // set the status to Redeemed
                System.out.println("PROCESSING ERROR: The bond has already been redeemed.");
                return false;
            } else if (bondToRedeem.NotMatured()) {
                System.out.println("PROCESSING ERROR: Bond has not matured and can't be redeemed yet.");
                return false;
            }

            // Change the bonds status if checks have passed.
            bondToRedeem.setBondStatus("redeemed");
            br.save(bondToRedeem);

        } finally {
            redeemLock.unlock(); // Release the lock
        }
        return true;
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