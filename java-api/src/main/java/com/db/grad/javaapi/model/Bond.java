package com.db.grad.javaapi.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Bond {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Double couponPercent;
    private String bondCurrency;
    private String cusip;
    private Double faceValue;
    private String isin;
    private LocalDate bondMaturityDate;
    private String bondStatus;
    private String type;

    @ManyToOne
    @JoinColumn(name = "bond_counter_party_id")
    private BondCounterParty bondCounterParty;


    @OneToMany(mappedBy = "bond")
    @JsonIgnoreProperties("bond")
    private List<Trade> trades;
    public int getId() {
        return id;
    }

    public Double getCouponPercent() {
        return couponPercent;
    }

    public void setCouponPercent(Double couponPercent) {
        this.couponPercent = couponPercent;
    }

    public String getBondCurrency() {
        return bondCurrency;
    }

    public void setBondCurrency(String bondCurrency) {
        this.bondCurrency = bondCurrency;
    }

    public String getCusip() {
        return cusip;
    }

    public void setCusip(String cusip) {
        this.cusip = cusip;
    }

    public Double getFaceValue() {
        return faceValue;
    }

    public void setFaceValue(Double faceValue) {
        this.faceValue = faceValue;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public LocalDate getBondMaturityDate() {
        return bondMaturityDate;
    }

    public void setBondMaturityDate(LocalDate bondMaturityDate) {
        this.bondMaturityDate = bondMaturityDate;
    }

    public String getBondStatus() {
        return bondStatus;
    }

    public void setBondStatus(String bondStatus) {
        this.bondStatus = bondStatus;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BondCounterParty getBondCounterParty() {
        return bondCounterParty;
    }

    public void setBondCounterParty(BondCounterParty bondCounterParty) {
        this.bondCounterParty = bondCounterParty;
    }

    public Boolean IsMatured(){
        LocalDate currentDate = LocalDate.now();
        LocalDate maturityDate = this.getBondMaturityDate();
        return currentDate.isAfter(maturityDate) ;
    }
    public Boolean NotMatured(){
        LocalDate currentDate = LocalDate.now();
        LocalDate maturityDate = this.getBondMaturityDate();
        return currentDate.isBefore(maturityDate) ;
    }

    public List<Integer> getTradeIds() {
        return trades.stream()
                .map(Trade::getId)
                .collect(Collectors.toList());
    }
}
