import { Injectable } from '@angular/core';
const w = () => {
  return window;
};

// обходное решение для типизации объекта window
@Injectable({ providedIn: 'platform' })
export class WinRefService {
  get window(): any {
    return w();
  }
}
