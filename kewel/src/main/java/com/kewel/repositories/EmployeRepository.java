package com.kewel.repositories;

import com.kewel.entities.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeRepository extends JpaRepository<Employe, Integer> {

    List<Employe> findByNom(@Param("nom") String nom);

    Optional<Employe> findById(Integer integer);
}
