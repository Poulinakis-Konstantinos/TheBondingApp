package com.db.grad.javaapi.model;


import javax.persistence.*;
import java.util.List;
@Entity
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, unique = true)
    private String userName;
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean isAdmin;


//     @ManyToMany(cascade = CascadeType.PERSIST)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_books",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<Book> books;




    public int getId() {
        return id;
    }


    public void setUserName(String username) {
        this.userName = username;
    }

    public String getUserName(){
        return this.userName;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public void makeAdmin(){
        this.isAdmin = true;
    }
    public boolean isAdmin() {
        return isAdmin;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                ", books=" + books +
                '}';
    }
}