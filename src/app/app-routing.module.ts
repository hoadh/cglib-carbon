import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layouts/site-layout/site-layout.component';

const routes: Routes = [
	{
		path: '',
		// component: AppLayoutComponent,
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'repos',
		// component: AppLayoutComponent,
		loadChildren: () =>
			import('./repositories/repositories.module').then(
				(m) => m.RepositoriesModule
			),
	},
	{
		path: 'auth',
		// component: SiteLayoutComponent,
		loadChildren: () =>
			import('./auth/auth.module').then(m => m.AuthModule),
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
