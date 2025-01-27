import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // contiene toda la lista de los gifs que estamos mostrando en el momento
  public gifList: Gifs[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'Yd66AqPNPO2RKlTebQoc2PC75r0xVKYf';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
   }

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

    this.saveLocalStorage();
  }

  // Guarda mi historial de busquedas
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  // cargar el localstorage
  private loadLocalStorage(): void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory  = JSON.parse(localStorage.getItem('history')!);

    if ( this._tagsHistory.length === 0 ) return;

    this.searchTag( this._tagsHistory[0]);
  }

  // Almacena la busqueda
  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);   
    
    // console.log(this._tagsHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search?`,{ params })
      .subscribe( resp => {

        this.gifList = resp.data;
        console.log({gifs: this.gifList});
      })

  }
}
