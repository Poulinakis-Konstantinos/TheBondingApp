package com.db.grad.javaapi.service;


import com.db.grad.javaapi.model.BondCounterParty;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.TradeCounterParty;
import com.db.grad.javaapi.repository.BondCounterPartyRepository;
import com.db.grad.javaapi.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class BondCounterPartyService {
    private BondCounterPartyRepository br;

    @Autowired
    public BondCounterPartyService(BondCounterPartyRepository br) {
        this.br = br;
    }

    public List<BondCounterParty> getAllBondCounterParties() {
        return br.findAll();
    }


    public BondCounterParty findById(int id){
        return br.findById(id).orElseThrow(() -> new EntityNotFoundException("BondCounterParty not found"));
    }
}
