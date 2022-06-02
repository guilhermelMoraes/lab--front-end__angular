import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    SignUpComponent,
  ]
})
export class SignUpModule { }
