import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="loading-spinner" *ngIf="loader">
      <mat-spinner class="loading" [diameter]="65"> </mat-spinner>
    </div>
  `,
  styleUrls: ['spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() loader: boolean = false;

  constructor() {}

  ngOnInit() {}
}
