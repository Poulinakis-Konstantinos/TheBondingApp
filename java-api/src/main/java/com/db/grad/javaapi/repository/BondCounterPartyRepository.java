package com.db.grad.javaapi.repository;


import com.db.grad.javaapi.model.BondCounterParty;
import com.db.grad.javaapi.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BondCounterPartyRepository extends JpaRepository<BondCounterParty, Integer> {

    BondCounterParty findByName(String name);
}