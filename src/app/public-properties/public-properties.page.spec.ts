import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicPropertiesPage } from './public-properties.page';

describe('PublicPropertiesPage', () => {
  let component: PublicPropertiesPage;
  let fixture: ComponentFixture<PublicPropertiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
