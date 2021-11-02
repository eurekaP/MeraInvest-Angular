import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'batp-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }



  ngOnInit() {

  }

}
