import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tour',
    loadChildren: () => import('./pages/tour/tour.module').then( m => m.TourPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'spot',
    loadChildren: () => import('./pages/spot/spot.module').then( m => m.SpotPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.module').then( m => m.AccessPageModule),
    canActivate: [ AuthService ]
  },
  {
    path: 'comments',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./pages/recommendations/recommendations.module').then( m => m.RecommendationsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'send-code',
    loadChildren: () => import('./pages/send-code/send-code.module').then( m => m.SendCodePageModule)
  },
  {
    path: 'new-password/:token',
    loadChildren: () => import('./pages/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },  {
    path: 'valorations',
    loadChildren: () => import('./pages/valorations/valorations.module').then( m => m.ValorationsPageModule)
  },
  {
    path: 'image-gallery',
    loadChildren: () => import('./pages/image-gallery/image-gallery.module').then( m => m.ImageGalleryPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'interests',
    loadChildren: () => import('./pages/interests/interests.module').then( m => m.InterestsPageModule)
  },
  {
    path: 'visit-register',
    loadChildren: () => import('./pages/visit-register/visit-register.module').then( m => m.VisitRegisterPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
