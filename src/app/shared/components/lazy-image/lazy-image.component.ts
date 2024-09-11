import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})

/**
  Al estar aquí, nosotros deberíamos de recibir forzadamente el URL el URL siempre lo vamos a necesitar.
  El URL de la imagen que queremos mostrar y la tiene que mandar desde el padre.
*/

export class LazyImageComponent implements OnInit {
 
/**
  El URL lo vamos a definir con el input y le vamos a poner public URL de tipo string.
  Se podria igualarla a un string vacío, pero no sería el caso porque siempre lo ocupamos.
  Entonces  lo definimos asi url!, siempre lo tiene que mandar.
*/
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  // cuando se carga por primera vez, esto no ha cargado
  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required.');
  }

  onLoad() {
    console.log('Image loaded');
    // cuando se carga la imagen 
    this.hasLoaded = true;
  }

}
