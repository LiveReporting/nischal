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
      this._db = new PouchDB('rws', { adapter: 'websql' });
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
                  this._db.changes({ live: true, since: 'now', include_docs: true})
                      .on('change', this.onDatabaseChange);
                  console.log("asdasd");
                  console.log(this._data);
                return this._data;
            });
    } else {
        // Return cached data as a promise
        console.log("h1");
        return Promise.resolve(this._data);
    }
}
update(data) {
    return this._db.put(data);
}

delete(data) {
    return this._db.remove(data);
}

private onDatabaseChange = (change) => {
    var index = this.findIndex(this._data, change.id);
    var data = this._data[index];

    if (change.deleted) {
        if (data) {
            this._data.splice(index, 1); // delete
        }
    } else {
        change.doc.Date = new Date(change.doc.Date);
        if (data && data._id === change.id) {
            this._data[index] = change.doc; // update
        } else {
            this._data.splice(index, 0, change.doc) // insert
        }
    }
}
private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
}

}
