import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { TableDialogComponent } from '../dialogs/table-dialog/table-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  charactersArray: any[] = [];

  // Paginator data
  dataSource: any;
  pageSize: number[] = [10, 25, 50]; 
  displayedColumns: string[] = ['name', 'ability', 'id'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  
  // Sort per paginator
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.apiService.getCharactersData().subscribe((response) =>{
      this.charactersArray = response;
      console.log(this.charactersArray);

      this.updateTable();
    });
  }

  // Ricerca
  filterChange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  onClick(elementId: number) :void{
    this.router.navigate(['characters/details', elementId]);
  }

  openDialog() :void{
    let arrayLength: number = this.charactersArray.length;
    const dialogRef = this.dialog.open(TableDialogComponent, {
      data: {arrayLength: arrayLength},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.charactersArray.push(result);
        this.updateTable();

        console.log(result)
      }
    });
  }

  updateTable() :void{
    this.dataSource = new MatTableDataSource<any>(this.charactersArray);
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

}