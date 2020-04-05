import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layouts/site-layout/site-layout.component';
import { CoreModule } from './_core/core.module';

import {
	NotificationModule,
	UserAvatarModule,
	AppSwitcherModule
} from '@carbon/icons-angular';

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
		NotificationModule,
		UserAvatarModule,
		AppSwitcherModule,
		GraphQLModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
