package com.db.grad.javaapi.service;

import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.util.Arrays;

import javax.annotation.PostConstruct;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.TradeCounterParty;
import com.db.grad.javaapi.model.BondCounterParty;
import com.db.grad.javaapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
@Service
public class DataLoader {

    private final BookRepository bookRepository;
    private final TradeRepository tradeRepository;
    private final BondRepository bondRepository;

    private final TradeCounterPartyRepository tradeCounterPartyRepository;

    private final BondCounterPartyRepository bondCounterPartyRepository;



    @Autowired
    public DataLoader(BookRepository bookRepository, TradeRepository tradeRepository, BondRepository bondRepository, BondCounterPartyRepository bondCounterPartyRepository, TradeCounterPartyRepository tradeCounterPartyRepository) {
        this.bookRepository = bookRepository;
        this.tradeRepository = tradeRepository;
        this.bondRepository = bondRepository;
        this.bondCounterPartyRepository = bondCounterPartyRepository;
        this.tradeCounterPartyRepository = tradeCounterPartyRepository;
    }


        @PostConstruct
        public void loadDataFromCsv() {

            if (bondRepository.count() == 0) {

                try {
                    ClassPathResource resource = new ClassPathResource("db-bonds-data.csv");
                    Reader reader = new InputStreamReader(resource.getInputStream());

                    CSVParser parser = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader);

                    String line;
                    for (CSVRecord record : parser) {
                        String tradeType = record.get(0);
                        String tradeCurrency = record.get(1);
                        Integer quantity = Integer.parseInt(record.get(2));
                        String tradeSettlementDate = record.get(3);
                        String tradeStatus = record.get(4);
                        String tradeDate = record.get(5);
                        Double unitPrice = Double.parseDouble(record.get(6));
                        Double couponPercent = Double.parseDouble(record.get(7));
                        String bondCurrency = record.get(8);
                        String cusip = record.get(9);
                        Double faceValue = Double.parseDouble(record.get(10));
                        String isin = record.get(11);
                        String issuerName = record.get(12).toLowerCase();
                        String bondMaturityDate = record.get(13);
                        String bondStatus = record.get(14);
                        String type = record.get(15);
                        String bookName = record.get(16).toLowerCase();
                        String bondHolder = record.get(17).toLowerCase();


                        BondCounterParty existingBondCounterParty = bondCounterPartyRepository.findByName(issuerName);

                        if (existingBondCounterParty == null) {
                            // If the BondCounterParty does not exist, create a new one and save it
                            BondCounterParty bondCounterParty = new BondCounterParty();
                            bondCounterParty.setName(issuerName);
                            bondCounterPartyRepository.save(bondCounterParty);
                            existingBondCounterParty = bondCounterParty; // seet existingBondCounterParty to the newly created BondCounterParty
                        }

                        // Check if a TradeCounterParty with the given bondHolder already exists in the database
                        TradeCounterParty existingTradeCounterParty = tradeCounterPartyRepository.findByName(bondHolder);

                        if (existingTradeCounterParty == null) {
                            // If the TradeCounterParty does not exist, create a new one and save it
                            TradeCounterParty tradeCounterParty = new TradeCounterParty();
                            tradeCounterParty.setName(bondHolder);
                            tradeCounterPartyRepository.save(tradeCounterParty);
                            existingTradeCounterParty = tradeCounterParty; // Set existingTradeCounterParty to new TradeCounterParty
                        }

                        // Check if a Bond with the same isin and cusip already exists in the database
                        Bond existingBond = bondRepository.findByIsinAndCusip(isin, cusip);

                        if (existingBond == null) {
                            // If the Bond does not exist, create a new one and save it
                            Bond bond = new Bond();
                            bond.setCouponPercent(couponPercent);
                            bond.setBondCurrency(bondCurrency);
                            bond.setCusip(cusip);
                            bond.setFaceValue(faceValue);
                            bond.setIsin(isin);
                            bond.setBondMaturityDate(dateTimeConveter(bondMaturityDate));
                            bond.setBondStatus(bondStatus);
                            bond.setType(type);
                            bond.setBondCounterParty(existingBondCounterParty); // Set the existing BondCounterParty
                            bondRepository.save(bond);
                            existingBond = bond; // Set existingBond to the newly created Bond
                        }

                        // Create and save a Book entity if it does not exist
                        Book existingBook = bookRepository.findByBookName(bookName);

                        if (existingBook == null) {
                            Book book = new Book();
                            book.setBookName(bookName);
                            bookRepository.save(book);
                            existingBook = book;
                        }

                        // Create and save a Trade entity
                        Trade trade = new Trade();
                        trade.setTradeType(tradeType);
                        trade.setTradeCurrency(tradeCurrency);
                        trade.setQuantity(quantity);
                        trade.setTradeSettlementDate(dateTimeConveter(tradeSettlementDate));
                        trade.setTradeStatus(tradeStatus);
                        trade.setTradeDate(dateTimeConveter(tradeDate));
                        trade.setUnitPrice(unitPrice);
                        trade.setBond(existingBond);
                        trade.setBook(existingBook);
                        trade.setTradeCounterParty(existingTradeCounterParty); // Set the existing TradeCounterParty
                        tradeRepository.save(trade);

                        System.out.println("---------------------------------------------------------");
                    }


                } catch (Exception e) {
                    e.printStackTrace();

                }
            }

        }


    public static LocalDate dateTimeConveter(String dateString) {
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendOptional(DateTimeFormatter.ofPattern("d/M/yyyy"))
                .appendOptional(DateTimeFormatter.ofPattern("M/d/yyyy"))
                .toFormatter();

        LocalDate localDate;
        try {
            localDate = LocalDate.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            // Handle the case where the date is not in either format
            throw new IllegalArgumentException("Invalid date format: " + dateString, e);
        }
        return localDate;
    }

}
