import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  @Input()imgsUrls: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.imgsUrls);
    this.imgsUrls.forEach((e: { id: number, url: string; }) => {
      e.url = environment.baseUrl + e.url.replace('\\','/');
    });
    console.log(this.imgsUrls);

  }

}
