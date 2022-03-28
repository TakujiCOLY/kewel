package com.kewel.services;

import com.kewel.entities.Employe;
import com.kewel.exception.EmployeNotFoundException;
import com.kewel.repositories.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeService {
    private final EmployeRepository repository;

    @Autowired
    public EmployeService(EmployeRepository repository) {
        this.repository = repository;
    }

    public Employe add(Employe employe) {
        return repository.save(employe);
    }

    public Employe update(Employe employe) {
        return repository.save(employe);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }

    public Employe findById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new EmployeNotFoundException("Employe by id "+id+" was not found"));
    }

    public List<Employe> findAll() {
        return repository.findAll();
    }

    public List<Employe> findByNom(String nom) {
        return repository.findByNom(nom);
    }
}
