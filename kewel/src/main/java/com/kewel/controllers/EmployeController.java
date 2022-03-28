package com.kewel.controllers;

import com.kewel.entities.Employe;
import com.kewel.services.EmployeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/employes")
public class EmployeController {
    private final EmployeService employeService;

    public EmployeController(EmployeService service) {
        this.employeService = service;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Employe> add(@RequestBody Employe employe) {
        Employe employe1 = employeService.add(employe);
        return new ResponseEntity<>(employe1, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<Employe> update(@RequestBody Employe employe) {
        Employe employe1 = employeService.update(employe);
        return new ResponseEntity<>(employe1, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        employeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/findAll")
    public ResponseEntity<List<Employe>> findAll() {
        List<Employe> employes = employeService.findAll();
        return new ResponseEntity<>(employes, HttpStatus.OK);
    }

    @GetMapping(value = "/findById/{id}")
    public ResponseEntity<Employe> findById(@PathVariable("id") int id) {
        Employe employe = employeService.findById(id);
        return new ResponseEntity<>(employe, HttpStatus.OK);
    }

    @PostMapping(value = "/findByNom")
    public ResponseEntity<List<Employe>> findByNom(@RequestBody Map<String, String> data) {
        List<Employe> employes = employeService.findByNom(data.get("nom"));
        return new ResponseEntity<>(employes, HttpStatus.OK);
    }

}
