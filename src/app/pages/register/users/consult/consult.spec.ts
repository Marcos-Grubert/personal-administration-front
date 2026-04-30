import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consult } from './consult';

describe('Consult', () => {
  let component: Consult;
  let fixture: ComponentFixture<Consult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consult],
    }).compileComponents();

    fixture = TestBed.createComponent(Consult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
