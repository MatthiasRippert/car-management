import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title = 'car-management';
}
