import {Injectable} from '@angular/core';
import {Velo} from "../model/velo-model";
import {Type} from "../model/type.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class VeloService {
  velos!: Velo[];
  velo!: Velo;
  types!: Type[];

  apiURL: string = 'http://localhost:8080/velos/api';


  constructor(private http: HttpClient) {

    /*this.mytypes = [{idType: 1, nomType: "MTB"},
      {idType: 2, nomType: "VTT"}];

    this.velos = [
      {
        idVelo: 1, modelVelo: "SC90", marqueVelo: "SCOTT", prixVelo: 1200, type: {idType: 2, nomType: "VTT"}
      },
      {
        idVelo: 2,
        modelVelo: "BETWEEN ROCK RIDER 540",
        marqueVelo: "BTWEEN",
        prixVelo: 3000,
        type: {idType: 1, nomType: "MTB"}
      },
      {
        idVelo: 3, modelVelo: "RR 4", marqueVelo: "ROCK RIDER", prixVelo: 2000, type: {idType: 1, nomType: "MTB"}
      }
    ];*/
  }

  /*listeVelo(): Velo[] {
    return this.velos;
  }*/

  listeVelo(): Observable<Velo[]> {
    return this.http.get<Velo[]>(this.apiURL);
  }

  /*ajouterVelo(velo: Velo) {
    this.velos.push(velo);
  }*/

  ajouterVelo(velo: Velo): Observable<Velo> {
    return this.http.post<Velo>(this.apiURL, velo, httpOptions);
  }

  /*supprimerVelo(velo: Velo) {
    const index = this.velos.indexOf(velo, 0);
    if (index > -1) {
      this.velos.splice(index, 1);
    }
  }*/

  supprimerVelo(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  /*consulterVelo(id: number): Velo {
    this.velo = this.velos.find(p => p.idVelo == id)!;
    return this.velo;
  }*/

  consulterVelo(id: number): Observable<Velo> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Velo>(url);
  }

  /*updateVelo(x: Velo) {
    this.supprimerVelo(x);
    this.ajouterVelo(x);
  }*/

  updateVelo(v: Velo): Observable<Velo> {
    return this.http.put<Velo>(this.apiURL, v, httpOptions);
  }

  /*listeType(): Type[] {
    return this.mytypes;
  }*/

  listeType(): Observable<Type[]> {
    const url = this.apiURL + "/type"
    return this.http.get<Type[]>(this.apiURL + "/type");
  }

  consulterType(id: number): Type {
    console.log('/', this.types)
    return this.types.find(tp => tp.idType == id)!;
  }

  rechercherParType(idType: number): Observable<Velo[]> {
    const url = `${this.apiURL}/velotype/${idType}`;
    return this.http.get<Velo[]>(url);
  }

  /*rechercherParNom(marque: string): Velo[] {
    console.log(this.velos.filter(v => v.marqueVelo!.toLowerCase().includes(marque.toLowerCase())));
    return this.velos.filter(v => v.marqueVelo!.toLowerCase().includes(marque.toLowerCase()));
  }*/

  rechercherParNom(nom: string):Observable<Velo[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Velo[]>(url);
  }

}
