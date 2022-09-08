import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { DialogComponent } from "./dialog/dialog.component";
import { StatusColorPipe } from './status-color.pipe';
import { MaterialModule } from "./material/material.module";
import { CharacterInfoComponent } from './character-info/character-info.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, DialogComponent, StatusColorPipe, CharacterInfoComponent],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
