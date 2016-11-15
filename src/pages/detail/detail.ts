import { Component ,ViewChild} from '@angular/core';
import { NavController, Platform , AlertController,Slides,NavParams} from 'ionic-angular';
import {Validators, FormBuilder,FormGroup ,FormControl} from '@angular/forms';
import {SaveData} from '../../providers/save-data';
import { Geolocation ,Camera} from 'ionic-native';



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
  public base64Image: string;
  public questionForm: FormGroup;
    public controls = (value: any = {}) => ({
      'id': [value.id],
      question1: [value.question1,Validators.required],
      question2: [value.question2,Validators.required],
      question3: [value.question3,Validators.required],
      longitude: [value.longitude,Validators.required],
      lattitude: [value.lattitude,Validators.required],
      alltitude: [value.alltitude],
      accuracy: [value.accuracy,Validators.required],
    });
  @ViewChild('questionSlider') questionSlider: Slides;

  // questionForm = new FormGroup({
  //   question1: [value.question1,Validators.required],
  //   question2: [value.question2,Validators.required],
  //   question3: [value.question3,Validators.required],
  //   longitude: [value.longitude,Validators.required],
  //   lattitude: [value.question2,Validators.required],
  //   alltitude: [values.question2,Validators.required],
  //   accuracy: [values.question2,Validators.required],
  // });


  // questions = new FormGroup({
  //     ques1: new FormControl(),
  //     ques2: new FormControl(),
  //     ques3: new FormControl(),
  //     lat: new FormControl(),
  //     lng: new FormControl(),
  //     alltitude: new FormControl(),
  //     accuracy: new FormControl()
  //   });
  constructor(public navCtrl: NavController ,
              private formBuilder: FormBuilder,
              private saveData: SaveData,
              public alertCtrl: AlertController,
              public navParams: NavParams) {

                // this.questionForm = this.formBuilder.group({
                //   question1: ['',Validators.required],
                //   question2: ['',Validators.required],
                //   question3: ['',Validators.required]
                //
                // });
                let values = this.navParams.get('edit_data') || {};
                this.buildData(values);


  }
  ionViewDidLoad() {
    console.log('Hello DetailPage Page');
    // this.registerForm = this.formBuilder.group({
    //   firstname: '',
    //   lastname: '',
    //   address: this.formBuilder.group({
    //     street: '',
    //     zip: '',
    //     city: ''
    //   })
    // });
      }
  buildData(vals){
    this.questionForm = this.formBuilder.group(this.controls(vals));

  }
  next(){
    // this.questionSlider.slideNext();
    if(this.questionForm.get('question1').valid && this.questionSlider.getActiveIndex() ==0){
        this.questionSlider.slideTo(1);
        // this.questionSlider.slideNext();
    }else if(this.questionForm.get('question2').valid && this.questionSlider.getActiveIndex() ==1){
      // this.questionSlider.slideNext();
      this.questionSlider.slideTo(2);
    }else if(this.questionForm.get('question3').valid && this.questionSlider.getActiveIndex() ==2){
      // this.questionSlider.slideNext();
      this.questionSlider.slideTo(3);
    }

  }
  prev(){
      this.questionSlider.slidePrev();
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  save(){
    console.log("asdas ::");
    console.log(this.questionForm.value);
    this.saveData.add(this.questionForm.value);
    this.navCtrl.pop();
  }

  showGpsConfirm() {
    console.log('confirm gps');
    Geolocation.getCurrentPosition().then((position) => {
      // console.log( position.coords.latitude+"::::"+ position.coords.longitude+"::::"+position.coords.accuracy );
      // this.questionForm.value.lat = position.coords.latitude;
      // this.questionForm.value.lng = position.coords.longitude;
      // this.questionForm.value.accuracy=position.coords.accuracy

      let confirm = this.alertCtrl.create({
        title: 'Confirm Gps',
        message: "Lattitude ::"+ position.coords.latitude +" \\ Longitude ::"+position.coords.longitude+ " \\ Accuracy ::" + position.coords.accuracy,
        buttons: [
          {
            text: 'Use',
            handler: () => {
              // console.log('Disagree clicked');
              this.questionForm.value.lattitude = position.coords.latitude;
              this.questionForm.value.longitude = position.coords.longitude;
              this.questionForm.value.accuracy=position.coords.accuracy;
            }
          },
          {
            text: 'Retry',
            handler: () => {
              // console.log('Agree clicked');
              this.showGpsConfirm();
            }
          }
        ]
      });
      confirm.present();
    });

  }

}
