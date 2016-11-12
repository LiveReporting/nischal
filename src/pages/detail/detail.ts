import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup ,FormControl} from '@angular/forms';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage {
  // myGroup = new FormGroup({
  //     firstname: new FormControl(),
  //     lastname: new FormControl(),
  //     address: new FormGroup({
  //       street: new FormControl(),
  //       zip: new FormControl(),
  //       city: new FormControl()
  //     })
  //   });
  storage ;
  questions = new FormGroup({
      ques1: new FormControl(),
      ques2: new FormControl(),
      ques3: new FormControl()

    });
  constructor(public navCtrl: NavController ,
              private formBuilder: FormBuilder) {


  }
  save(){
    console.log("asdas ::");
    console.log(this.questions.value);
    this.savePanni(this.questions.value);
  }

  savePanni = (panni) => {
    let query = "INSERT OR REPLACE INTO panni VALUES (?, ?, ?)";
    for (let pani of panni) {
      console.log(pani);
    }
    return panni;
  }

  ionViewDidLoad() {
    // console.log('Hello DetailPage Page');
    // this.registerForm = this.formBuilder.group({
    //   firstname: '',
    //   lastname: '',
    //   address: this.formBuilder.group({
    //     street: '',
    //     zip: '',
    //     city: ''
    //   })
    // });
    this.questions = this.formBuilder.group({
       ques1: '',
       ques2: '',
       ques3: ''

    });
  }

}
