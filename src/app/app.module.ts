import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { LoadingScreenComponent } from './core/loading-screen/loading-screen.component';
import { LoginComponent } from './core/login/login.component';
import { MenuBarComponent } from './core/menu-bar/menu-bar.component';
import { VehicleSubmenuBarComponent } from './modules/vehicles/vehicle-submenu-bar/vehicle-submenu-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuBarComponent,
    FooterComponent,
    LoginComponent,
    LoadingScreenComponent,
    VehicleSubmenuBarComponent,
    
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
