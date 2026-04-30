import {AfterViewInit, Component, effect, inject} from '@angular/core';
import {Startup} from './pages/startup/startup';
import {VideoService} from './services/video-service';
import {Home} from './pages/home/home';
import {Popup} from './widgets/popup/popup';

@Component({
  selector: 'app-root',
  imports: [
    Startup,
    Home,
    Popup
  ],
  templateUrl: './app.html'
})
export class App {

  protected readonly videoService = inject(VideoService);

}
