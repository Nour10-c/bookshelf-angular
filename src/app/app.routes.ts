import { Routes } from '@angular/router';

import { Watchlist } from './media/watchlist/watchlist';
import { MediaDetail } from './media/media-detail/media-detail';
import { MediaForm } from './media/media-form/media-form';

export const routes: Routes = [
  // Page principale : liste des médias
  { path: '', component: Watchlist },

  // Ajouter un média
  { path: 'watchlist/new', component: MediaForm },

  // Modifier un média
  { path: 'watchlist/:id/edit', component: MediaForm },

  // Afficher le détail d'un média
  { path: 'watchlist/:id', component: MediaDetail },

  // Redirection des URL inconnues
  { path: '**', redirectTo: '' },
];
