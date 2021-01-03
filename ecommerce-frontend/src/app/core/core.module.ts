import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TruncateTextPipe } from './pipes/truncate-text/truncate-text.pipe';
import { AuthInterceptorService } from './helpers/auth-interceptor.service';


@NgModule({
  declarations: [TruncateTextPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
  }
  ]
})
export class CoreModule { }
