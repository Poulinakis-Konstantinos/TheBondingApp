package com.db.grad.javaapi.model;
import javax.persistence.*;
import java.util.List;
@Entity
public class BondCounterParty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;


    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}