import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { acquisitionsRootReducer } from '@store/reducers/index.reducer';
import { AcquisitionsEffect } from '@store/effects/acquisitions.effect';
import { AppFacade } from '@app/app.facade';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from '@commons/services/modal.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ app: acquisitionsRootReducer }),
    EffectsModule.forRoot([AcquisitionsEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    AppFacade,
    AcquisitionsEffect,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
