import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class KewelService {
  private api: String = environment.apiBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  public add(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.api}/v1/employes/add`, employe, this.httpOptions);
  }

  public update(employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.api}/v1/employes/update`, employe, this.httpOptions);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/v1/employes/delete/` + id, this.httpOptions);
  }

  public findById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.api}/v1/employes/` + id);
  }

  public findByNom(nom: string): Observable<Employe[]> {
    return this.http.post<Employe[]>(`${this.api}/v1/employes/findByNom`,{'nom': nom}, this.httpOptions);
  }

  public findAll(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.api}/v1/employes/findAll`);
  }
}
