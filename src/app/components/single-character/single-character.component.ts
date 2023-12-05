import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
}
