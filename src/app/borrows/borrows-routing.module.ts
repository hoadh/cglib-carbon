import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowAddComponent } from './borrow-add/borrow-add.component';


const routes: Routes = [
	{
		path: '',
		component: BorrowListComponent
	},
	{
		path: 'add',
		component: BorrowAddComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BorrowsRoutingModule {
}
