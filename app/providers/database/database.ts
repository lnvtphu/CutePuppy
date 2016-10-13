import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class Database {
  private storage : SQLite;
  private isOpen: boolean;
  public constructor(){
    if(!this.isOpen){
      this.storage = new SQLite;
      this.storage.openDatabase({name: "data.db", location: "default"}).then( () => {
        this.storage.executeSql("CREATE TABLE IF NOT EXISTS user(id varchar(30), username varchar(30) , level int, avatar varchar(255)) ",[]);
        this.isOpen = true;
      });
    }
  }
  registerUser(id, username, level, avatar){
    return new Promise((resolve, reject) => {
      this.storage.executeSql("INSERT INTO user(id, username, level, avatar ) VALUES(?, ?, ?, ?)",[id, username, level, avatar]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  deleteTable(){
    return new Promise((resolve, reject) => {
      this.storage.executeSql("DROP TABLE user", []).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getUser(){
    return new Promise((resolve, reject) => {
      this.storage.executeSql("SELECT id, avatar, level, username FROM user", []).then((data) => {
        resolve(data.rows.item(0));
      }, (error) => {
        reject(error);
      });
    });
  }
}
