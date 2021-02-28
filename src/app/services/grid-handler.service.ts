import { Cell } from './../model/cell';
import { CellHandler } from './cell-handler.service';
import { GridCreatorService } from './grid-creator.service';
import { Formation } from './../enums/formation';
import { Injectable } from '@angular/core';
import { Grid } from '../model/grid';

@Injectable({
  providedIn: 'root'
})
export class GridHandlerService {

  constructor(private gridCreator: GridCreatorService,
              private cellHandler: CellHandler) { }

  initializeGrid(grid: Grid, formation: Formation): void {
    const cells = this.gridCreator.createGrid(grid);
    this.cellHandler.setCells(grid, cells);

    this.cellHandler.setFormation(formation);
    this.updateGrid();
  }

  updateCells(): void {
    this.cellHandler.updateCells();
  }

  updateGrid(): void {
    this.cellHandler.getCells()
      .forEach(cell => this.cellHandler.updateClass(cell));
  }
}
