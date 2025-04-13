import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  data: any;
  fields: { label: string; key: string }[] = [];
  headerTitleKey: string = '';
  headerSubtitleKey: string = '';
  imageKey?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.data = dialogData.data;
    this.fields = dialogData.fields;
    this.headerTitleKey = dialogData.headerTitleKey;
    this.headerSubtitleKey = dialogData.headerSubtitleKey;
    this.imageKey = dialogData.imageKey;
  }
}
