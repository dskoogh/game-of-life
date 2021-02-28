import { GridHandlerService } from './services/grid-handler.service';
import { Formation } from './enums/formation';
import { CellHandler } from './services/cell-handler.service';
import { GridCreatorService } from './services/grid-creator.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: BehaviorSubject<any> = new BehaviorSubject(undefined);
  selecting = true;

  constructor(private grid: GridHandlerService) {}

  ngOnInit(): void {
    this.form.subscribe(data => {
      if (data && data.ok) {
        this.selecting = false;

        alert("Click on the screen to start and stop animation");
        this.grid.initializeGrid({
          width: data.width,
          height: data.height
        },
        Formation[data.formation]);
      }
    });
  }
}
