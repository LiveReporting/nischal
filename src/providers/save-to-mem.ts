import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {File} from 'ionic-native';
import {AlertController} from 'ionic-angular';
/*
  Generated class for the SaveToMem provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var cordova:any;

@Injectable()
export class SaveToMem {
  sdCardPath = cordova.file.externalRootDirectory ; //this Path created in ionicPlatform.ready
  filePath = this.sdCardPath +"/Rural_Water_Supply_Data";
  constructor(public http: Http,
              public alertCtrl: AlertController) {
    console.log('Hello SaveToMem Provider');


    File.checkDir(this.sdCardPath,"Rural_Water_Supply_Data").then(() =>{
      // this.showAlert("alredy");
    } ,(err) => {
          // console.log(err);
          // this.showAlert("checkerror"+err);
          File.createDir(this.sdCardPath, "Rural_Water_Supply_Data",false).then( () => {
            // this.showAlert("Success fully created");
            this.filePath = this.sdCardPath +"/Rural_Water_Supply_Data";
          },(err) => {
            // this.showAlert(err);

          });

        });

  }
  showAlert(s) {
    let alert = this.alertCtrl.create({
      title: s,
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  saveCSVAndPhotoToCard(dirNam,fileNam,imageData,csvData){
    var dirName= dirNam.replace(/ /g, "_");
    var fileName = fileNam.replace(/ /g, "_");
    // this.showAlert(imageData+ "saving to mem");
    File.checkDir(this.filePath, dirName).then(() =>{
      this.showAlert("Already created " +dirName);
      File.createFile(this.filePath+"/"+dirName, fileName+"_photo.jpeg", false).then(()=>{
        File.writeFile(this.filePath+"/"+dirName, fileName+"_photo.jpeg", imageData,false ).then(() => {
          // this.showAlert("Saved CSV DATA");
        })
      })
      File.createFile(this.filePath+"/"+dirName, fileName+".csv", false).then(()=>{
        File.writeFile(this.filePath+"/"+dirName, fileName+".csv", csvData,false ).then(() => {
          // this.showAlert("Saved CSV DATA");
        })
      })

    } ,(err) => {
      this.showAlert(dirName+" not created pjhoto");

      File.createDir(this.filePath,dirName,false).then( () => {
        this.showAlert("Photo Success fully created " + dirName);
        File.createFile(this.filePath+"/"+dirName, fileName+"_photo.jpeg", false).then(()=>{
          File.writeFile(this.filePath+"/"+dirName, fileName+"_photo.jpeg", imageData,false ).then(() => {
            // this.showAlert("Saved CSV DATA");
          })
        })
        File.createFile(this.filePath+"/"+dirName, fileName+".csv", false).then(()=>{
          File.writeFile(this.filePath+"/"+dirName, fileName+".csv", csvData,false ).then(() => {
            // this.showAlert("Saved CSV DATA");
          })
        })

      })

    });
  }

}
