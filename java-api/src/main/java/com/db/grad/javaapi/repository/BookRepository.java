package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.TradeCounterParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByBookName(String bookName);

    @Query(value="SELECT DISTINCT name " +
            "FROM TRADE_COUNTER_PARTY " +
            "WHERE id IN (SELECT TRADE_COUNTER_PARTY_ID FROM trade WHERE book_id IN :bookIds)",
            nativeQuery = true)
    List<String> getClientNamesInBooks(@Param("bookIds") List<Integer> bookIds);

//    List<Book> findBooksByUserID(int userID) ;
}