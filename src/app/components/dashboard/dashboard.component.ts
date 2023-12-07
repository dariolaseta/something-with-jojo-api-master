import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTestComponent } from '../dialogs/dialog-test/dialog-test.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  gifLink: string = '';
  gifLinksArray: string[] = [
    'https://media3.giphy.com/media/XlmIK6MGuuVbrre1bU/giphy.gif',
    'https://media.tenor.com/4kQJ33NUFbkAAAAC/jotaro-kujo-jojo-bizarre-adventure.gif',
    'https://steamuserimages-a.akamaihd.net/ugc/959732343597073737/5FBAF677D6CFDB27481A5F5E2C146F4858F963BA/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    'https://www.icegif.com/wp-content/uploads/icegif-6981.gif',
    'https://media2.giphy.com/media/QyWBTLDn9WHt0FXGJS/giphy.gif',
    'https://37.media.tumblr.com/8dc51f6f7bd120f58806aeaa63a23809/tumblr_n9x82rOKtq1rvyzuho1_500.gif',
    'https://giffiles.alphacoders.com/202/20227.gif',
    
  ];

  something: string = '';

  ngOnInit(): void {
    this.getGifLink();
  }

  openDialog() :void{
    const dialogRef = this.dialog.open(DialogTestComponent, {
      width: '350px',
      data: { something: this.something }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo chiuso");
      this.something = result;
      console.log(this.something);
    });
  }

  getGifLink() :void{
    let randomNum = Math.floor(Math.random() * this.gifLinksArray.length);

    this.gifLink = this.gifLinksArray[randomNum];
  }
}
