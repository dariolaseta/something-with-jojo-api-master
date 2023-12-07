import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent implements OnInit {

  name: string = '';
  ability: string = '';
  id!: number;
  isAlive!: boolean;

  constructor(
    private dialogRef: MatDialogRef<TableDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    
  }

  closeDialog(){
    let arrayLength = this.data.arrayLength;
    this.id = ++arrayLength;

    if(this.name !== '' && this.ability !== ''){
      const data = {
        name: this.name,
        abilities: this.ability,
        id: this.id,
        living: this.isAlive,
      }

      this.dialogRef.close(data);

      this.successMessage('Personaggio creato con successo.', 'Chiudi');
    }
  }

  successMessage(message: string, action: string) :void{
    this.snackBar.open(message, action);
  }
}
