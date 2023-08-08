package com.db.grad.javaapi.repository;


import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.TradeCounterParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeCounterPartyRepository extends JpaRepository<TradeCounterParty, Integer> {

    TradeCounterParty findByName(String name);

}