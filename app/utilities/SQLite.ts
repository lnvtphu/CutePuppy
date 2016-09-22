import { SQLite } from 'ionic-native';

export class SQL{
  public static cmdSQLite(cmd){
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql(cmd, {}).then((rs) => {
        return rs;
      }, (err) => {
        return 'errexeccmd';
      });
    }, (err) => {
      return 'erropendata';
    });
  }
}
