import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralService } from '../central.service';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
Product_list=[];
message:string;
username:any
subscription: Subscription;
products;
products$: AngularFireList<any>;
  constructor(private snackBar:MatSnackBar,private rb:ActivatedRoute,private route:Router,private db:AngularFireDatabase,private http:HttpClient,private dataService:CentralService) {

    this.products = db.list('/courses');
    this.products$ = this.products.valueChanges();
   }

  ngOnInit(): void {

  this.rb.params.subscribe(obj=>
    {
      
this.username=obj.username;
this.dataService.changeMessage(this.username);

    })
     let a=[]
    this.subscription=this.db.list('/arrayOfProducts').snapshotChanges().subscribe(actions=>
      {
        
        actions.forEach(action => {

let assign1=Object.assign(action.payload.val(),{"$key":action.key});

this.Product_list.push(assign1);
        });
        
      })
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
delete(event)

{
 let a=this.db.list("/arrayOfProducts")

a.remove(event.$key);
  console.log(event);
  this.Product_list=[];
 // let snackBarRef = this.snackBar.open('Deleted Successfully');
 this.snackBar.open('Deleted Successfully', '', {
  duration: 2000,
  verticalPosition: 'top',
  panelClass: ['green-snackbar']
}); 
}
update(e)
{
console.log(e);
let name=e.name;
let price=e.price;
let key=e.$key
   this.route.navigate(["/Add-Product",this.username,name,price,key],{ queryParams: {"Edit":true}})

}

} 
