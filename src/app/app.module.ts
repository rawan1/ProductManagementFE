import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component'
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ImageCarouselComponent,
    EditProductComponent,
    ImgUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCarouselModule,
    MatSnackBarModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
