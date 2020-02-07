import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: any [] = [];

  constructor() {
    this.cargarStorage();
    // const lista1 = new Lista('recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');
    // this.listas.push(lista1, lista2);
    // console.log(this.listas);

  }

  crearLista(titulo: string) {

    const newLista = new Lista(titulo);
    this.listas.push(newLista);
    this.guardarStorage();
    return newLista.id;
  }

  obtenerLista(id: string| number) {
    id = Number(id);
    return this.listas.find(data =>  data.id === id );
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data') );
    } else {
     this.listas = [];
    }
  }

}
