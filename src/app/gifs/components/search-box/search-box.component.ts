import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    > 
    `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') 
  public tagInput!: ElementRef<HTMLInputElement>;
  
  constructor( private gifsService: GifsService) {}

  // Recibe el newTag a buscar
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag });
    
    // Consume el metodo searchTag de gifsService
    this.gifsService.searchTag(newTag);

    // limpio la caja de texto
    this.tagInput.nativeElement.value = '';
  }
}
