import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { TerminologyItemComponent } from './terminology-item/terminology-item.component';
import { TerminologyAddComponent } from './terminology-add/terminology-add.component';
import { TerminologyEditComponent } from './terminology-edit/terminology-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TerminologyItemComponent,
    TerminologyAddComponent,
    TerminologyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
