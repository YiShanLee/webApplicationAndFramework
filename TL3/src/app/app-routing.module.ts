import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { TerminologyAddComponent } from './terminology-add/terminology-add.component';
import { TerminologyEditComponent } from './terminology-edit/terminology-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent},
  { path: 'terminology-add', component: TerminologyAddComponent },
  { path: 'terminology-edit/:id', component: TerminologyEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
