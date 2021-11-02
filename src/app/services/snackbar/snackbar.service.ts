import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number, htmlClass: string, horizontal: any, vertical: any) {
    this.snackBar.open(message, '', {
      duration: duration,
      panelClass: htmlClass,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }
}
