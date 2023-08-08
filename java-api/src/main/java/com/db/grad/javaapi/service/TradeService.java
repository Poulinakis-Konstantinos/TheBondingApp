package com.db.grad.javaapi.service;


import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TradeService {
    private TradeRepository tradeRepository;

    @Autowired
    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }


    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    public Trade findById(int id){
        return tradeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<Trade> findTradesByBondId(int bondId) {
        return tradeRepository.findTradesByBondId(bondId);
    }

    public List<Trade> findTradesByBondIdAndUserId(int bondId, List<Integer> bookIds) {
        return tradeRepository.findTradesByBondIdAndUserId(bondId, bookIds);
    }
}
