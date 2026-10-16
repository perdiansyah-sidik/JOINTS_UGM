import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenjualanMaterialPage } from './penjualan-material.page';

describe('PenjualanMaterialPage', () => {
  let component: PenjualanMaterialPage;
  let fixture: ComponentFixture<PenjualanMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
