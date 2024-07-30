import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

// Creamos un componente de prueba para probar la directiva
@Component({
  template: `<div appHighlight>Test Element</div>`
})
class TestComponent { }

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;
  let directiveInstance: HighlightDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    // Configura TestBed
    TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent],
      providers: [
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setStyle']) }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(HighlightDirective)).nativeElement;
    renderer = TestBed.inject(Renderer2);

    // Obtén la instancia de la directiva
    directiveInstance = new HighlightDirective(new ElementRef(element), renderer);
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should highlight the background color on mouse enter', () => {
    directiveInstance.onMouseEnter();
    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'backgroundColor', 'grey');
  });

  it('should remove highlight color on mouse leave', () => {
    directiveInstance.onMouseLeave();
    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'backgroundColor', null);
  });
});
