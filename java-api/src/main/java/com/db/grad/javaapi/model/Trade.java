package com.db.grad.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String tradeType;
    private String tradeCurrency;
    private Integer quantity;
    private LocalDate tradeSettlementDate;
    private String tradeStatus;
    private LocalDate tradeDate;
    private Double unitPrice;

    @ManyToOne
    @JoinColumn(name = "bond_id")
    @JsonIgnore
    private Bond bond;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonIgnore //break the infinite loop
    private Book book;

    @ManyToOne
    @JoinColumn(name = "trade_counter_party_id")
    private TradeCounterParty tradeCounterParty;


    public int getId() {
        return id;
    }

    public String getTradeType() {
        return tradeType;
    }

    public void setTradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public String getTradeCurrency() {
        return tradeCurrency;
    }

    public void setTradeCurrency(String tradeCurrency) {
        this.tradeCurrency = tradeCurrency;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getTradeSettlementDate() {
        return tradeSettlementDate;
    }

    public void setTradeSettlementDate(LocalDate tradeSettlementDate) {
        this.tradeSettlementDate = tradeSettlementDate;
    }

    public String getTradeStatus() {
        return tradeStatus;
    }

    public void setTradeStatus(String tradeStatus) {
        this.tradeStatus = tradeStatus;
    }

    public LocalDate getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(LocalDate tradeDate) {
        this.tradeDate = tradeDate;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Bond getBond() {
        return bond;
    }

    public void setBond(Bond bond) {
        this.bond = bond;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public TradeCounterParty getTradeCounterParty() {
        return tradeCounterParty;
    }

    public void setTradeCounterParty(TradeCounterParty tradeCounterParty) {
        this.tradeCounterParty = tradeCounterParty;
    }

    public int getBondId() {
        return (bond != null) ? bond.getId() : null;
    }

    public int getBookId() {
        return (book != null) ? book.getId() : null;
    }

    public int getTradeCounterPartyId() {
        return (tradeCounterParty != null) ? tradeCounterParty.getId() : null;
    }



}
