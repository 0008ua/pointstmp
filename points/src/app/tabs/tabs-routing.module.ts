import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/auth.guard';
import { NoAuthGuard } from '../modules/auth/no-auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'analytics',
        loadChildren: () =>
          import('../modules/analytics-tab/analytics-tab.module').then(
            (m) => m.AnalyticsTabPageModule,
          ),
        // canLoad: [NoAuthGuard],
        // canActivate: [NoAuthGuard],
      },
      {
        path: 'games',
        loadChildren: () =>
          import('../modules/games/games.module').then(
            (m) => m.GamesPageModule,
          ),
        // canLoad: [AuthGuard],
        // canActivate: [AuthGuard],
      },

      {
        path: 'auth',
        loadChildren: () =>
          import('../modules/auth/auth.module').then((m) => m.AuthModule),
        // canLoad: [NoAuthGuard],
        // canActivate: [NoAuthGuard],
      },
      // {
      //   path: '',
      //   redirectTo: 'games',
      //   // pathMatch: 'full'
      // },
      {
        path: '**',
        redirectTo: 'games',
        // pathMatch: 'full'
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
