import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-page404',
    templateUrl: './page404.component.html',
    styleUrls: ['./page404.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
    ],
})
export class Page404Component {
  constructor(
    private _router: Router
  ) {
    
  }

  redirectHome() {
    this._router.navigate(['/dashboard/main']);
  }
}
