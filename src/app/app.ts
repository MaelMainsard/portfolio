import {AfterViewInit, Component, effect, inject} from '@angular/core';
import {Startup} from './pages/startup/startup';
import {VideoService} from './services/video-service';
import {Home} from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [
    Startup,
    Home
  ],
  templateUrl: './app.html'
})
export class App {

  protected readonly videoService = inject(VideoService);

}
