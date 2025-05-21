import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'auth',
  imports: [ButtonModule, Card],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public onHandleWatcherClick(): void {
    console.log('Watcher!');
  }

  public onHandleParticipantClick(): void {
    console.log('Participant!');
  }
}
