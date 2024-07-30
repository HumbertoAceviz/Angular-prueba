import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}


  //Escuchamos el evento de cuando el mouse pasa por el elemento ,
  //Y llama al metodo Onmousenter que llama a highlight para pasarle un color
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('grey');

  }
//Cuando el mouse sale del elemento , se vuelve a llamar highligth para pasarle un null,
// y quitar el color agregado anteriormente
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }


  // Metodo que cambiara el color del elemento del dom, utiliando render2, mediante el color
  // que se le asigne en la llamada del evento mousenter
  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
