import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CharacterEditComponent } from '../dialogs/character-edit/character-edit.component';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.scss']
})
export class SingleCharacterComponent implements OnInit {

  charactersArray: any[] = [];
  id!: number;

  // Edit
  canEdit: boolean = false;
  editedCharacterIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getId();

    this.apiService.getCharactersData().subscribe((response) => {
      this.charactersArray = response;
      console.log("Array normale: ", this.charactersArray);
    });
  }

  getId(){
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

  saveChanges(): void {
    this.charactersArray[this.id].name = this.charactersArray[this.id].name;
    this.charactersArray[this.id].nationality = this.charactersArray[this.id].nationality;
    this.charactersArray[this.id].abilities = this.charactersArray[this.id].abilities;
    this.charactersArray[this.id].chapter = this.charactersArray[this.id].chapter;
    this.charactersArray[this.id].isHuman = this.charactersArray[this.id].isHuman;

    this.canEdit = false;
    
    this.successMessage('Salvato con successo.', 'Chiudi');

    console.log("Array aggiornato: ", this.charactersArray);
  }

  successMessage(message: string, action: string) :void{
    this.snackBar.open(message, action);
  }

  openDialog() :void{
    const dialogRef = this.dialog.open(CharacterEditComponent, {
      data: {
        name: this.charactersArray[this.id - 1].name,
        abilities: this.charactersArray[this.id - 1].abilities,
        nationality: this.charactersArray[this.id - 1].nationality,
        chapter: this.charactersArray[this.id - 1].chapter,
      },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.charactersArray[this.id - 1].name = result.name;
        this.charactersArray[this.id - 1].abilities = result.abilities;
        this.charactersArray[this.id - 1].nationality = result.nationality;
        this.charactersArray[this.id - 1].chapter = result.chapter;

        console.log(this.charactersArray)
      }
    });
  }
}
