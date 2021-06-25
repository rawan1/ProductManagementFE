import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  constructor(private productSrvc: ProductsService, public formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { }
  images: any[] = [];
  product: any;
  productId: number = 0;
  subscribe: Subscription = new Subscription();
  product$!: Observable<any>;
  myForm = this.formBuilder.group({
    title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    description: new FormControl(null, [Validators.minLength(10)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
  });
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productSrvc.getProductById(this.productId);
    this.subscribe.add(this.product$.subscribe(r => {
      this.product = Object.assign({}, r);
      this.product.imagesUrls.forEach((e: {id: number, url: string; }) => {
        e.url = environment.baseUrl + e.url.replace('\\','/');
      });
      Object.keys(this.product).forEach(name => {
        if (this.f[name]) {
          this.f[name].patchValue(this.product[name], {onlySelf: true});
        }
      });
    }));
  }
  deleteImg(index: number, id: number, type: string = 'file') {
    if(type === 'file') {
      this.images.splice(index, 1);

    }else {
      if(confirm('Are you sure')){
        this.product.imagesUrls.splice(index, 1);
        this.subscribe.add(this.productSrvc.deleteProductImg(id).subscribe());
      }
     
    }
  }
  get f(){
    return this.myForm.controls;
  }
      
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.images.push(event.target.files[0]); 
    }
  }
  submit(){
    const formData = new FormData();
    for (var i = 0; i < this.images.length; i++) { 
      formData.append("images", this.images[i]);
    }
    if(this.myForm.value['title'] === null) {
      formData.append('details',JSON.stringify(this.product));

    }else {
      formData.append('details',JSON.stringify(this.myForm.value));

    }
    console.log(this.myForm.value);
    this.subscribe.add(this.productSrvc.updateProduct(formData, this.productId).subscribe(
      () => this.router.navigate(['./'])
    ));
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
