import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  constructor(private productSrvc: ProductsService,) { }
  products: any[] = [];
  pageNumber: number = 1;
  displayedColumns: string[] = ['position','title', 'description', 'quantity', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  totalRecords: number = 0;
  pageEvent!: PageEvent;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.productSrvc.getAllProducts(this.pageNumber).subscribe(r => {
      this.totalRecords = r.totalRecords;
      this.products = [...r.data];
      this.dataSource = new MatTableDataSource<Product>(r.data);
    });
  }
  getServerData($event: any) {
    this.productSrvc.getAllProducts($event.pageIndex).subscribe(r => {
      this.totalRecords = r.totalRecords;
      this.products = [...r.data];
      this.dataSource = new MatTableDataSource<Product>(r.data);
    });
    return $event;
  }
  delete(productId: number, index: number) {
    if(confirm("are you sure about deleting this product")) {
      this.productSrvc.deleteProduct(productId).subscribe(r => {
        this.products.splice(index, 1);
        this.dataSource = new MatTableDataSource<Product>(this.products);
      });
    }
  }
}
