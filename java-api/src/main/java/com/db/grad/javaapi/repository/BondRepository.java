package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Bond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BondRepository extends JpaRepository<Bond, Integer> {

    Bond findByIsinAndCusip(String isin, String cusip);

    @Query(value = "SELECT * FROM bond WHERE id IN (SELECT bond_id FROM trade WHERE book_id = :bookId)", nativeQuery = true)
    List<Bond> findBondsByBookId(int bookId);


    @Query("SELECT b FROM Bond b WHERE b.bondMaturityDate BETWEEN :startDate AND :endDate")
    List<Bond> findBondsWithMaturityDateInFiveDays(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT b FROM Bond b WHERE b.bondMaturityDate BETWEEN :startDate AND :endDate")
    List<Bond> findBondsWithMaturityDateFiveDaysBefore(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);


    @Query(value = "SELECT * FROM bond WHERE id IN (SELECT bond_id FROM trade WHERE book_id IN :bookIds)", nativeQuery = true)
    List<Bond> findBondsByBookIds(List<Integer> bookIds);

    @Query(value = "SELECT b.* FROM Bond b WHERE b.bond_Maturity_Date BETWEEN :startDate AND :endDate AND b.id IN (SELECT bond_id FROM Trade t WHERE t.book_id IN :bookIds)", nativeQuery = true)
    List<Bond> findUserBondsWithMaturityDateFiveDaysBefore(@Param("startDate") LocalDate startDate,
                                                           @Param("endDate") LocalDate endDate,
                                                           @Param("bookIds") List<Integer> bookIds);

    @Query(value = "SELECT b.* FROM Bond b WHERE b.bond_Maturity_Date BETWEEN :startDate AND :endDate AND b.id IN (SELECT bond_id FROM Trade t WHERE t.book_id IN :bookIds)", nativeQuery = true)
    List<Bond> findUserBondsWithMaturityDateInFiveDays(@Param("startDate") LocalDate startDate,
                                                       @Param("endDate") LocalDate endDate,
                                                       @Param("bookIds") List<Integer> bookIds);

    @Query(value="SELECT * FROM bond WHERE id IN (SELECT bond_id FROM trade WHERE book_id IN :bookIds) AND bondStatus = 'redeemed' ", nativeQuery = true)
    List<Bond> findAllRedeemedBonds(@Param("bookIds") List<Integer> bookIds);

}