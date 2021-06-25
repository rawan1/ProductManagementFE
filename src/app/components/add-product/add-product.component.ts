import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productSrvc: ProductsService, public formBuilder: FormBuilder, private router: Router) { }
  images: any[] = [];
  error: any;
  myForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.minLength(10)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
  });
  ngOnInit(): void {
  }

  get f(){
    return this.myForm.controls;
  }
      
  onFileChange(event: any) {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
        this.images.push(event.target.files[0]); 
    }
  }
  deleteImg(index: number) {
    this.images.splice(index, 1);
  }
  submit(){
    const formData = new FormData();
    for (var i = 0; i < this.images.length; i++) { 
      formData.append("images", this.images[i]);
    }
    console.log(this.myForm.value['title']);
    console.log(this.myForm.value);
    formData.append('details',JSON.stringify(this.myForm.value));
    this.productSrvc.addProduct(formData).pipe(
      catchError(async (e) => this.error = e.error,
       ),
    ).subscribe((r) => {
      if(r !== 'Invalid input'){
        this.router.navigate(['./'])
      }
    });
  }
}
