import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  static path = () => ['dashboard'];

  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';

      if (params[key1] === 'success') {
        this.snackBar.open('You have been loggedin successfully', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
