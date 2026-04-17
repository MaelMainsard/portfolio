import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoService {

  private readonly _progress = signal<number>(0);
  readonly progress: Signal<number> = this._progress.asReadonly();

  private readonly _loaderAnimationDone = signal<boolean>(false);
  readonly loaderAnimationDone: Signal<boolean> = this._loaderAnimationDone.asReadonly();

  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * Lance une boucle qui incrémente le compteur de progression jusqu'à 100
   * pour simuler un temps de chargement.
   */
  startLoading(): void {
    if (this.intervalId !== null) return;

    this._progress.set(0);
    this._loaderAnimationDone.set(false);

    this.intervalId = setInterval(() => {
      const current = this._progress();

      if (current >= 100) {
        this.stopLoading();
        return;
      }

      this._progress.set(current + 1);
    }, 50);
  }

  private stopLoading(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Appelé par le video-loader quand son animation de sortie est terminée.
   */
  notifyLoaderAnimationDone(): void {
    this._loaderAnimationDone.set(true);
  }
}
