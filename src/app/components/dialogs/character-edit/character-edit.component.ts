import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TableDialogComponent>,
    private message: MatSnackBar,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  save() :void{
    const data = {
      name: this.data.name,
      abilities: this.data.abilities,
      nationality: this.data.nationality,
      chapter: this.data.chapter,
      living: this.data.living,
    }

    this.apiService.editCharacter(data, this.data.id);

    this.dialogRef.close();

    this.message.open("Personaggio modificato con successo.", "Chiudi")
  }

}
