import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [AppComponent, HeaderComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header').textContent).toContain('Movie Details App');
  });

  it("should have the 'Movie Details App' title", () => {
    expect(component.title).toEqual('Movie Details App');
  });
});
