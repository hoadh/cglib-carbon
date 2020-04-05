import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layouts/site-layout/site-layout.component';
import { CoreModule } from './_core/core.module';

import { HttpConfigInterceptor } from './_core/interceptors/http-config-interceptor';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AppLayoutComponent,
		SiteLayoutComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		GraphQLModule,
		HttpClientModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, multi: true, useClass: HttpConfigInterceptor }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
