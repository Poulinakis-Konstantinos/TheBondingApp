package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.TradeCounterParty;
import com.db.grad.javaapi.repository.BondCounterPartyRepository;
import com.db.grad.javaapi.repository.TradeCounterPartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TradeCounterPartyService {
    private TradeCounterPartyRepository tr;

    @Autowired
    public void tradeCounterPartyService(BondCounterPartyRepository br) {
        this.tr = tr;
    }

    public List<TradeCounterParty> getAllBondCounterParties() {
        return tr.findAll();
    }


    public TradeCounterParty findById(int id){
        return tr.findById(id).orElseThrow(() -> new EntityNotFoundException("BondCounterParty not found"));
    }

    public List<TradeCounterParty> getAllTradeCounterParties() {
        return tr.findAll();
    }
}
