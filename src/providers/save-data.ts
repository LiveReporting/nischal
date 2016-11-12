import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// <reference path="../../../typings/global/require/index.d.ts" />
import * as PouchDB from 'pouchdb';


/*
  Generated class for the SaveData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class SaveData {
  private _db;
  private _data;

  constructor(public http: Http) {
    console.log('Hello SaveData Provider');
  }
  initDB() {
      this._db = new PouchDB('seconddb', { adapter: 'websql' });
  }

  add(data) {
  return this._db.post(data);
  }
  getAll() {

    if (!this._data) {
      // console.log("asdasd");
        // console.log(this._db.allDocs({ include_docs: true}));
        return this._db.allDocs({ include_docs: true})
            .then(docs => {

                // Each row has a .doc object and we just want to send an
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.

                this._data = docs.rows.map(row => {
                    // Dates are not automatically converted from a string.
                    // row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });

                // Listen for changes on the database.
                  // this._db.changes({ live: true, since: 'now', include_docs: true})
                  //     .on('change', this.onDatabaseChange);
                  // console.log("asdasd");
                  // console.log(this._data);
                return this._data;
            });
    } else {
        // Return cached data as a promise
        console.log("h1");
        return Promise.resolve(this._data);
    }
}
onDatabaseChange(){

}


}
