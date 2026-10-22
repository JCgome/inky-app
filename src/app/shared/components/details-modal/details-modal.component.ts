import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DetailsModalData {
  data: Record<string, unknown>;
  fields: { label: string; key: string }[];
  headerTitleKey: string;
  headerSubtitleKey: string;
  imageKey?: string;
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  data: Record<string, unknown>;
  fields: { label: string; key: string }[] = [];
  headerTitleKey = '';
  headerSubtitleKey = '';
  imageKey?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DetailsModalData) {
    this.data = dialogData.data;
    this.fields = dialogData.fields;
    this.headerTitleKey = dialogData.headerTitleKey;
    this.headerSubtitleKey = dialogData.headerSubtitleKey;
    this.imageKey = dialogData.imageKey;
  }
}
