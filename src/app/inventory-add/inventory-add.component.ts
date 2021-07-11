import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from '../central.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  form: FormGroup;
  images;
  key: any
  Edit: any
  username:any
  subscription: Subscription;
  randomImgUrl: any;
  constructor(private snackBar: MatSnackBar,private rb: ActivatedRoute, private db: AngularFireDatabase, private fb: FormBuilder, private http: HttpClient, private dataservice: CentralService, private route: Router) {
    this.form = this.fb.group(
      {

        name: ['', [Validators.required, Validators.minLength(10)]],

        price: ['', [Validators.required, Validators.minLength(10)]]
      }
    )
  }

  ngOnInit() {
    this.rb.params.subscribe(obj=>
      {
        this.username=obj['username']
      })
    this.rb.queryParams.subscribe(obj => {
      console.log(obj);
      if (obj) {
        this.Edit = obj.Edit
        if (obj.Edit == 'true') {

          this.rb.params.subscribe(obj => {
            this.key = obj.key
            this.form.patchValue({ 'name': obj.name });
            this.form.patchValue({ 'price': obj.price });

          })
        }
      }
    })

  }
  onSubmit() {
    console.log(this.form.value);
    let obj = this.form.value;
    this.http.get('../../assets/JSON/Images.json').subscribe(responseimage => {
      console.log(responseimage)
      this.randomImgUrl = responseimage;
      console.log(this.randomImgUrl)
      var randomNum = this.randomImgUrl[Math.floor(Math.random() * this.randomImgUrl.length)].ImageUrl;
      console.log(randomNum)
      Object.assign(obj, { "imgUrl": randomNum });
      console.log(obj);
      const value = this.db.list('/arrayOfProducts')
      value.push(obj).then(obj => {
        console.log(obj);
      })
    })


  }
  navigate() {
   // this.route.navigateByUrl("Product-list");
    this.route.navigate(["/Product-list",this.username])
  }
  getRandomImgUrl() {
    return this.randomImgUrl + '?cache=' + new Date().getTime()
  }
  onUpdate() {



    const tutorialsRef = this.db.list('arrayOfProducts');

    tutorialsRef.update(this.key, this.form.value);
    //let snackBarRef = this.snackBar.open('Updated Successfully');
    this.snackBar.open('Updated Successfully', '', {
      duration: 2000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top'
    });
  }
}
