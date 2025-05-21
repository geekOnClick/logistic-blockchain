import { Component, input, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'warn-message',
  imports: [Toast],
  templateUrl: './warn-message.component.html',
  standalone: true,
  styleUrl: './warn-message.component.scss',
  providers: [
    MessageService
  ],
})
export class WarnMessageComponent {
  public message = input<string>();

  constructor(private messageService: MessageService) {
    this.showMessage({ summary: 'Алярма!', detail: 'Ошибка!' });
    this.messageService.add({ text: 'qweqweqewqew' });
  }

  public showMessage(message: { summary: string; detail?: string }): void {
    const { summary, detail } = message;
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      sticky: true,
      closable: false
    });
  }

  public hideMessage(): void {
    this.messageService.clear();
  }
}
