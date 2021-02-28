import { BehaviorSubject } from 'rxjs';
import { Formation } from './../enums/formation';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'state-selector',
  templateUrl: './state-selector.component.html',
  styleUrls: ['./state-selector.component.css']
})
export class StateSelectorComponent implements OnInit {

  @Input() data: BehaviorSubject<any>;
  formations = [];
  formation: string;
  height = 50;
  width = 50;
  readonly threshold = 250;
  error: any = {};

  constructor() { }

  ngOnInit(): void {
    this.formations = Object.keys(Formation);
  }

  checkFormation(): void {
    if (!this.formation) {
      this.error.radio = "Please select formation";
    } else {
      this.error.radio = undefined;
    }

    if (!this.height || this.height > this.threshold) {
      this.error.height = "Max height is " + this.threshold;
    } else {
      this.error.height = undefined;
    }

    if (!this.width || this.width > 300) {
      this.error.width = "Max width is " + this.threshold;
    } else {
      this.error.width = undefined;
    }

    if (!this.error || (!this.error.radio && !this.error.height && !this.error.width)) {
      this.confirmInput();
    }
  }

  private confirmInput(): void {
    this.data.next({
      formation: this.formation,
      width: this.width,
      height: this.height,
      ok: true
    });
  }
}
