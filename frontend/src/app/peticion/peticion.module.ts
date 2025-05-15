import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionRoutingModule } from './peticion-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MineComponent } from './mine/mine.component';
import { FirmasComponent } from './firmas/firmas.component';


@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    EditComponent,
    IndexComponent,
    MineComponent,
    FirmasComponent,
  ],
  imports: [
    CommonModule,
    PeticionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PeticionModule { }
