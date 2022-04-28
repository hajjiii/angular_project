import { animate, state, style, transition, trigger } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  animations:[
    trigger('openClose',[
      state('open',style(
        {
          height:'500px',
          backgroundColor:"aqua"
        }
      )),
      state('close',style(
        {
          height:"250px",
          backgroundColor:"green"
        }
      )),
      transition('open=>close',[
        animate('2s')
      ]),
      transition('close=>open',[
        animate('3s')

      ])

    ])
  ],
  selector: 'app-animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.css']
})
export class AnimationDemoComponent implements OnInit {

  isOpen=true

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.isOpen=!this.isOpen
  }
}
