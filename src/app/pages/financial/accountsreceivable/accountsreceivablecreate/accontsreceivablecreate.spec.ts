import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accontsreceivablecreate } from './accontsreceivablecreate';

describe('Accontsreceivablecreate', () => {
  let component: Accontsreceivablecreate;
  let fixture: ComponentFixture<Accontsreceivablecreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accontsreceivablecreate],
    }).compileComponents();

    fixture = TestBed.createComponent(Accontsreceivablecreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
