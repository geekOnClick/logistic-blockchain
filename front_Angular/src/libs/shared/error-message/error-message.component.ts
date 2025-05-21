import { Component, input, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'error-message',
  imports: [Toast],
  templateUrl: './error-message.component.html',
  standalone: true,
  styleUrl: './error-message.component.scss',
  providers: [
    {
      provide: MessageService,
      useClass: MessageService,
    },
  ],
})
export class ErrorMessageComponent implements OnInit {
  public readonly networkError = false;
  public message = input<string>();

  constructor(private messageService: MessageService) {
    this.showMessage({ summary: 'Алярма!', detail: 'Ошибка!' });
  }

  ngOnInit() {
    this.showMessage({ summary: 'Алярма!', detail: 'Ошибка!' });
  }

  public showMessage(message: { summary: string; detail?: string }): void {
    const { summary, detail } = message;
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      sticky: true,
    });
  }
}
