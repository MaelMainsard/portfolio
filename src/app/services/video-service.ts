import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';

export interface VideoStatus {
  ready: boolean;
  url: string | null;
}

@Injectable({ providedIn: 'root' })
export class VideoService {

  private readonly VIDEO_URL = 'assets/COSTA_RICA.mp4';

  private readonly _progress = signal<number>(0);
  readonly progress: Signal<number> = this._progress.asReadonly();

  private readonly _loaderAnimationDone = signal<boolean>(false);
  readonly loaderAnimationDone: Signal<boolean> = this._loaderAnimationDone.asReadonly();

  private readonly _videoStatus = signal<VideoStatus>({
    ready: false,
    url: null,
  });
  readonly videoStatus: Signal<VideoStatus> = this._videoStatus.asReadonly();

  private httpService:HttpClient = inject(HttpClient);

  /**
   * Déclenche le signal de début de téléchargement et lance
   * le téléchargement réel de la vidéo COSTA_RICA avec suivi de progression.
   */
  startLoading(): void {
    this.downloadVideo().catch(() => {});
  }

  private async downloadVideo(): Promise<void> {

    this.httpService.get(this.VIDEO_URL, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this._progress.set(event.total ? Math.round((event.loaded / event.total) * 100) : 0)
        }

        if (event.type === HttpEventType.Response) {
          const blob = event.body!;
          this._videoStatus.set({
            ready: true,
            url: URL.createObjectURL(blob),
          })
        }
      },
      error: (err) => {

      }
    });

  }

  /**
   * Appelé par le video-loader quand son animation de sortie est terminée.
   */
  notifyLoaderAnimationDone(): void {
    this._loaderAnimationDone.set(true);
  }
}
