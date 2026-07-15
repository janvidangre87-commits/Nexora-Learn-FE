import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportNotes } from './import-notes';

describe('ImportNotes', () => {
  let component: ImportNotes;
  let fixture: ComponentFixture<ImportNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
