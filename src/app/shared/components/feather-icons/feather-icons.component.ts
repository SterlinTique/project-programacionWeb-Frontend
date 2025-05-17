import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
    selector: 'app-feather-icons',
    templateUrl: './feather-icons.component.html',
    styleUrls: ['./feather-icons.component.scss'],
    standalone: true,
    imports: [FeatherModule],
})
export class FeatherIconsComponent {
  @Input() public icon?: string;
  @Input() public class?: string;
  constructor() {
    // constructor
  }
}
