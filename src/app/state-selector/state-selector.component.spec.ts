import { BehaviorSubject } from 'rxjs';
import { Formation } from './../enums/formation';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSelectorComponent } from './state-selector.component';

describe('StateSelectorComponent', () => {
  let component: StateSelectorComponent;
  let fixture: ComponentFixture<StateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check formation', () => {
    component.data = new BehaviorSubject(undefined);

    component.checkFormation();
    expect(component.error.formation).toBeTruthy();

    component.formation = Formation.BEE_HIVE.toString();
    component.checkFormation();
    expect(component.error.formation).toBeUndefined();
    expect(component.error.height).toBeUndefined();
    expect(component.error.width).toBeUndefined();

    component.width = 1000;
    component.height = 300;
    component.checkFormation();
    expect(component.error.formation).toBeUndefined();
    expect(component.error.height).toBeTruthy();
    expect(component.error.width).toBeTruthy();
  });
});
