import { NgModule } from '@angular/core';

import {
	AddModule,
	EditModule,
	DotMarkModule,
	ChevronRightGlyphModule,
	ArrowRightModule,
	TrashCanModule,
	NotificationModule,
	UserAvatarModule,
	AppSwitcherModule
} from '@carbon/icons-angular';

import { PersonFavorite32Module } from '@carbon/icons-angular/lib/person--favorite/32';
import { Globe32Module } from '@carbon/icons-angular/lib/globe/32';
import { Application32Module } from '@carbon/icons-angular/lib/application/32';

const modules: any[] = [
	AddModule,
	EditModule,
	DotMarkModule,
	ChevronRightGlyphModule,
	ArrowRightModule,
	TrashCanModule,
	PersonFavorite32Module,
	Globe32Module,
	Application32Module,
	NotificationModule,
	UserAvatarModule,
	AppSwitcherModule
];

@NgModule({
	imports: [...modules],
	exports: [...modules]
})
export class CarbonIconsModule {
}
