import { GridHandlerService } from './../services/grid-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'automator',
  templateUrl: './automator.component.html',
  styleUrls: ['./automator.component.css']
})
export class AutomatorComponent {

  stepping = false;

  constructor(private grid: GridHandlerService) { }

  start(): void {
    this.stepping = !this.stepping;
    if (this.stepping) {
      console.log("Starting");
      this.step();
    }
  }

  private step(): void {
    setTimeout(() => {
      if (this.stepping) {
        this.grid.updateCells();
        this.grid.updateGrid();
        this.step();
      }
    }, 60);
  }
}
