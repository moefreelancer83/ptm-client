import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { taskReducer } from './store/tasks/task.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { TaskEffects } from '@_store/tasks/task.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ task: taskReducer }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideEffects(TaskEffects),
  ],
};
