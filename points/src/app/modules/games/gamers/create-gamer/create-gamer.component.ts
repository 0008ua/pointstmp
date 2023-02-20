import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Colors, IGamer } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { SelectColorComponent } from '../select-color/select-color.component';

@Component({
  selector: 'app-create-gamer',
  templateUrl: './create-gamer.component.html',
  styleUrls: ['./create-gamer.component.scss'],
})
export class CreateGamerComponent implements OnInit {
  playersColors = environment.games.train.playersColors as Colors[];
  color: Colors = this.playersColors[0];
  name: string;
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}
  async presentPopover(event: Event, component: any, data: any): Promise<any> {
    const popover = await this.popoverController.create({
      component,
      cssClass: 'select-color-popover',
      // event,
      componentProps: data,
      translucent: true,
    });
    await popover.present();
    return await popover.onDidDismiss();
  }

  async showSelectColorPopup(event: Event) {
    const { data } = await this.presentPopover(event, SelectColorComponent, {
      colors: this.playersColors,
    });
    if (data) {
      const { color } = data;
      this.color = color;
    }
  }

  dismiss(data?: any): void {
    this.popoverController.dismiss(data);
  }

  onCreate() {
    this.dismiss({
      gamer: {
        color: this.color,
        name: this.name,
      },
    });
  }
}
