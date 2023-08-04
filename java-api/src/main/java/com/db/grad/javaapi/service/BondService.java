package com.db.grad.javaapi.service;


import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.repository.BondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;

@Service
public class BondService {
    private BondRepository br;

    @Autowired
    public BondService(BondRepository itsBondRepo) {
        this.br = itsBondRepo;
    }


    public List<Bond> getAllBonds() {
        return br.findAll();
    }


    public List<Bond> findBondsByBookId(int bookId) {

        return br.findBondsByBookId(bookId);
    }

    public List<Bond> findBondsByBookIds(List<Integer> bookIds) {
        return br.findBondsByBookIds(bookIds);
    }

    public Bond findById(int id){
        return br.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<Bond> findBondsWithMaturityDateInFiveDays(LocalDate currentDate){
        LocalDate targetDate = currentDate.plusDays(5);
        System.out.println(targetDate + " and " + currentDate);
        return br.findBondsWithMaturityDateInFiveDays(currentDate, targetDate);
    }

    public List<Bond> findBondsWithMaturityDateFiveDaysBefore(LocalDate currentDate){
        LocalDate targetDate = currentDate.minusDays(5);
        System.out.println(targetDate + " and " + currentDate);
        return br.findBondsWithMaturityDateFiveDaysBefore(targetDate, currentDate);
    }
}
