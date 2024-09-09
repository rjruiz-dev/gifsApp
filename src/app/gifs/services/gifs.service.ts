import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'Yd66AqPNPO2RKlTebQoc2PC75r0xVKYf';

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    // paso el tag a minuscula
    tag = tag.toLowerCase();

    // si _tagsHistory incluye el tag nuevo que recibo como argumento, lo elimino
    if(this._tagsHistory.includes(tag)){
      
      // obtengo un arreglo con con todos los tag menos el que coincida con el que ya tenia
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    // inserto el nuevo elemento al inicio
    this._tagsHistory.unshift( tag );

    // limito el arreglo a 10 elementos
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  // Almacena la busqueda
  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);   
    
    console.log(this._tagsHistory);
  }
}
