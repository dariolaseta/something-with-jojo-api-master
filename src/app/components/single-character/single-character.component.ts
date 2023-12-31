import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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

  myModel = {};

  // Edit
  canEdit: boolean = false;
  editedCharacterIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getId();

    this.getCharacter();
  }

  getCharacter() :void{
    this.apiService.getCharactersData().subscribe((response) => {
      this.charactersArray = response;

      if(this.charactersArray[this.id - 1] === undefined){
        this.router.navigate(['/error']);
      }
    });
  }

  getId(){
    this.id = this.route.snapshot.params['id'];
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
        living: this.charactersArray[this.id - 1].living,
        id: this.charactersArray[this.id - 1].id,
        image: this.charactersArray[this.id - 1].image,
      },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCharacter();
    });
  }
}
