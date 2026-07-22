import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSection } from './create-new-section';

describe('CreateNewSection', () => {
  let component: CreateNewSection;
  let fixture: ComponentFixture<CreateNewSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
