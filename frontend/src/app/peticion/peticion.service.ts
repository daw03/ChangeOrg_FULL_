import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  constructor(private http: HttpClient) {}
  // Create peticion
  create(peticion: FormData): Observable<any> {
    const headers= new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post('http://127.0.0.1:8000/api/peticiones', peticion,( {headers: headers}));
  }

  // Mostrar todas las peticiones (sin parámetros)
  index(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/peticiones');
  }

  // Mostrar peticion por id (con parámetros)
  show(id: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/peticiones/${id}`);
  }

  // Mostrar mis peticiones (sin parámetros)
  myPeticiones(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/mispeticiones')
  }

  // Borrar
  delete(id: string): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/peticiones/${id}`, {});
  }

  // Actualizar
  update(id: string, peticion: Peticion): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/peticiones/${id}`, {peticion});
  }

}
