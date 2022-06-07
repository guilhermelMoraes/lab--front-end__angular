import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStrategyComponent } from './strategies/local-strategy.component';

@NgModule({
  declarations: [SignUpComponent, LocalStrategyComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [SignUpComponent],
})
export class SignUpModule {}
