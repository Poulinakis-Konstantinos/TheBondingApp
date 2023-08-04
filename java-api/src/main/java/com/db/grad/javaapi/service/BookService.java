package com.db.grad.javaapi.service;


import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondRepository;
import com.db.grad.javaapi.repository.BookRepository;
import com.db.grad.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private BookRepository br;

    @Autowired
    public BookService(BookRepository br) {
        this.br = br;
    }


    public List<Book> getAllBooks() {
        return br.findAll();
    }


    public List<Book> findAllById(List<Integer> bookIds) {
        return br.findAllById(bookIds);
    }


    public Book findById(int id) {
        return br.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<Integer> getBookIdsByUser(User user) {
        List<Book> userBooks = user.getBooks() ;
        List<Integer> bookIds = new ArrayList<>() ;
        for(Book book: userBooks){
            bookIds.add(book.getId()) ;
        }
        return bookIds ;
    }
}
