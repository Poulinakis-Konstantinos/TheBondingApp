package com.db.grad.javaapi.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AppServiceTest {

    @Mock
    private BondService bondService;

    @Mock
    private TradeService tradeService;

    @Mock
    private BookService bookService;

    @Mock
    private UserService userService;

    @Mock
    private TradeCounterPartyService tradeCounterPartyService;

    @Mock
    private BondCounterPartyService bondCounterPartyService;

    @InjectMocks
    private AppService appService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllTrades() {
        List<Trade> mockTrades = Arrays.asList(new Trade(), new Trade());
        when(tradeService.getAllTrades()).thenReturn(mockTrades);

        List<Trade> result = appService.getAllTrades();

        assertEquals(mockTrades, result);
    }

    @Test
    public void testFindBondsByBookId() {
        int bookId = 123;
        List<Bond> mockBonds = Arrays.asList(new Bond(), new Bond());
        when(bondService.findBondsByBookId(bookId)).thenReturn(mockBonds);

        List<Bond> result = appService.findBondsByBookId(bookId);

        assertEquals(mockBonds, result);
    }

    @Test
    public void testFindUserBondsWithMaturityDateInFiveDays() {
        int userId = 456;
        LocalDate currentDate = LocalDate.now();

        List<Integer> bookIds = Arrays.asList(1, 2, 3);
        User mockUser = new User();
        mockUser.setBooks(new ArrayList<>());
        when(userService.findById(userId)).thenReturn(mockUser);
        when(bookService.getBookIdsByUser(mockUser)).thenReturn(bookIds);

        List<Bond> mockBonds = Arrays.asList(new Bond(), new Bond());
        when(bondService.findUserBondsWithMaturityDateInFiveDays(currentDate, bookIds)).thenReturn(mockBonds);

        List<Bond> result = appService.findUserBondsWithMaturityDateInFiveDays(currentDate, userId);

        assertEquals(mockBonds, result);
    }

    // TODO: Add more test cases for other methods in AppService
}
