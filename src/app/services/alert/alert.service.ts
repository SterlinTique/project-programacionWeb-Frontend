import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition = 'bottom',
    placementAlign: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
