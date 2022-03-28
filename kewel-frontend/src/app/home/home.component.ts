import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employe } from '../models/employe';
import { KewelService } from '../services/kewel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public employes!: Employe[];
  public searchEmployeForm!: FormGroup;
  public addEmployeForm!: FormGroup;
  public editEmployeForm!: FormGroup;
  public submittedAdd!: Boolean;
  public submittedUpdate!: Boolean;
  public p!: number;
  public ipp!: number;
  public idDelete!: number;

  constructor(private modal: NgbModal, private kewelService: KewelService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.initializeForm();
    this.submittedAdd = false;
    this.submittedUpdate = false;
    this.p = 1;
    this.ipp = 10;
    this.idDelete = 0;
  }

  public initializeForm() {
    this.searchEmployeForm = this.fb.group({
      nom: ['', Validators.required]
    });
    this.addEmployeForm = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
    this.editEmployeForm = this.fb.group({
      id: ['', Validators.required],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  public get fAdd() { return this.addEmployeForm.controls; }

  public get fUpdate() { return this.editEmployeForm.controls; }

  public addEmploye() {
    this.submittedAdd = true;
    if (this.addEmployeForm.invalid)
      return;
    let employe = new Employe();
    employe.adresse = this.addEmployeForm.value.adresse;
    employe.email = this.addEmployeForm.value.email;
    employe.matricule = parseInt(this.addEmployeForm.value.matricule);
    employe.nom = this.addEmployeForm.value.nom;
    employe.prenom = this.addEmployeForm.value.prenom;
    this.kewelService.add(employe).subscribe(
      (response: Employe) => {
        this.getData();
        this.effacerChampsAdd();
      }
    );
  }

  public updateEmploye() {
    this.submittedUpdate = true;
    if (this.editEmployeForm.invalid)
      return;
    let employe = new Employe();
    employe.id = parseInt(this.editEmployeForm.value.id);
    employe.nom = this.editEmployeForm.value.nom;
    employe.prenom = this.editEmployeForm.value.prenom;
    employe.adresse = this.editEmployeForm.value.adresse;
    employe.email = this.editEmployeForm.value.email;
    employe.matricule = parseInt(this.editEmployeForm.value.matricule);
    this.kewelService.update(employe).subscribe(
      (response: Employe) => {
        this.getData();
        this.effacerChampsUpdate();
        this.modal.dismissAll();
      });
  }

  public deleteEmploye(id: number) {
    this.kewelService.delete(id.toString()).subscribe();
    this.modal.dismissAll();
    this.getData();
  }

  public searchEmploye() {
    if (this.searchEmployeForm.value.nom == '')
      return;
    this.kewelService.findByNom(this.searchEmployeForm.value.nom).subscribe(
      (response: Employe[]) => { this.employes = response; },
      (error: HttpErrorResponse) => {console.log(error.message)}
    );
  }

  public getData() {
    this.kewelService.findAll().subscribe(
      (response: Employe[]) => { this.employes = response; },
      (error: HttpErrorResponse) => { console.log(error.message); });
  }

  public effacerChampsAdd() {
    this.submittedAdd = false;
    this.addEmployeForm.setValue({
      matricule: '',
      prenom: '',
      nom: '',
      adresse: '',
      email: ''
    });
  }

  public effacerChampsUpdate() {
    this.submittedUpdate = false;
    this.editEmployeForm.setValue({
      id: '',
      matricule: '',
      prenom: '',
      nom: '',
      adresse: '',
      email: ''
    });
  }

  public open(content: any) {
    this.modal.open(content, { size: 'lg' })
  }

  public openDelete(content: any, id: number) {
    this.idDelete = id;
    this.modal.open(content, {size: 'sm'})
  }

  public openUpdate(content: any, employe: Employe) {
    this.editEmployeForm.setValue({
      id: employe.id,
      matricule: employe.matricule,
      prenom: employe.prenom,
      nom: employe.nom,
      adresse: employe.adresse,
      email: employe.email
    });
    this.modal.open(content, { size: 'lg' });
  }

}
