import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JenisSampahPage } from './jenis-sampah.page';

describe('JenisSampahPage', () => {
  let component: JenisSampahPage;
  let fixture: ComponentFixture<JenisSampahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisSampahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
