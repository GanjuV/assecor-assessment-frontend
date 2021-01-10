import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IChips } from './chips.interface';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() chipData: IChips[] = [];

  ngOnInit() {}

  drop(event: CdkDragDrop<IChips[]>) {
    moveItemInArray(this.chipData, event.previousIndex, event.currentIndex);
  }
}
