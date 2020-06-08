import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-loader',
  templateUrl: './block-loader.component.html',
  styleUrls: ['./block-loader.component.scss']
})
export class BlockLoaderComponent implements OnInit {
  
  @Input() blocked: boolean;
        
  // blockDocument() {
  //     this.blocked = true;
  //     setTimeout(() => {
  //         this.blocked = false;
  //     }, 3000);
  // }

  constructor() { }

  ngOnInit() {
    // this.blockDocument();
  }

}
