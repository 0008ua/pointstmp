import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Colors } from 'src/app/interfaces';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss'],
})
export class SelectColorComponent implements OnInit {
  @Input() colors: Colors[];

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  dismiss(data?: any): void {
    this.popoverController.dismiss(data);
  }

  onSelect(color: Colors) {
    this.dismiss({
      color,
    });
  }
}
