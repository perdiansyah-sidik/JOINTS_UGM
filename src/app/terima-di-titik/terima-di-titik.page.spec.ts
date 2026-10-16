import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerimaDiTitikPage } from './terima-di-titik.page';

describe('TerimaDiTitikPage', () => {
  let component: TerimaDiTitikPage;
  let fixture: ComponentFixture<TerimaDiTitikPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerimaDiTitikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
