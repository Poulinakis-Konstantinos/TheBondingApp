package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {
    @Query(value = "SELECT * FROM trade WHERE bond_id = :bondId", nativeQuery = true)
    List<Trade> findTradesByBondId(int bondId);

    @Query(value = "SELECT * FROM trade WHERE bond_id = :bondId and book_id in :bookIds", nativeQuery = true)
    List<Trade> findTradesByBondIdAndUserId(int bondId, List<Integer> bookIds);
}