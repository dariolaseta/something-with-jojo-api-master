import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit {

  data: string = '';

  constructor(private dialogRef: MatDialogRef<DialogTestComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    let data: string = this.data;

    this.dialogRef.close(data);
  }
}
