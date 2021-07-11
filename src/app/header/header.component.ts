import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentralService } from '../central.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  subscription:Subscription
  constructor(public dialog: MatDialog,private route:Router,private data:CentralService) { }
message:any
  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }
ngOnDestroy()
{
  this.subscription.unsubscribe();
}
logout()
{
  this.message=null;  
  this.route.navigate(['/login']);
  //this.subscription.unsubscribe();
  
}
openDialog() {
 
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '500px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', + result);
    
if(result == 0)
{
  this.message=null; 
  this.route.navigate(['/login']);
}
    
  });
}
}
