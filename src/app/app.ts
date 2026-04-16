import { Component } from '@angular/core';
import {Cookies} from './pages/cookies/cookies';

@Component({
  selector: 'app-root',
  imports: [
    Cookies
  ],
  templateUrl: './app.html'
})
export class App {
}
