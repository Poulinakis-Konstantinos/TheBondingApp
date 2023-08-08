package com.db.grad.javaapi.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@SpringBootTest
public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllBooks() {
        List<Book> mockBooks = Arrays.asList(new Book(), new Book());
        when(bookRepository.findAll()).thenReturn(mockBooks);

        List<Book> result = bookService.getAllBooks();

        assertEquals(mockBooks, result);
    }

    @Test
    public void testFindAllById() {
        List<Integer> bookIds = Arrays.asList(1, 2, 3);
        List<Book> mockBooks = Arrays.asList(new Book(), new Book());
        when(bookRepository.findAllById(bookIds)).thenReturn(mockBooks);

        List<Book> result = bookService.findAllById(bookIds);

        assertEquals(mockBooks, result);
    }

    @Test
    public void testFindById() {
        int bookId = 123;
        Book mockBook = new Book();
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(mockBook));

        Book result = bookService.findById(bookId);

        assertEquals(mockBook, result);
    }

    @Test(expected = EntityNotFoundException.class)
    public void testFindByIdNotFound() {
        int bookId = 456;
        when(bookRepository.findById(bookId)).thenReturn(Optional.empty());

        bookService.findById(bookId);
    }

    @Test
    public void testGetBookIdsByUser() {
        User mockUser = new User();
        List<Book> mockBooks = Arrays.asList(new Book(), new Book());
        mockUser.setBooks(mockBooks);

        List<Integer> result = bookService.getBookIdsByUser(mockUser);

        assertEquals(Arrays.asList(0, 0), result); // Modify this assertion based on actual book IDs
    }
    // Add more test cases for other methods in BookService
}
