import SQLite from 'react-native-sqlite-2';
 
const database_name = "Recipe.db";
const database_version = "1.0";
const database_displayname = "SQLite Recipe Database";
const database_size = 200000;

export default class Database {
    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...")
                    console.log("Opening Database ...")
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                    .then(DB => {
                        db = DB;
                        console.log("Databse OPEN");
                        db.executeSql('SELECT 1 from Recipes LIMIT 1').then(() => {
                            console.log("Databse is ready .. executing query ...");
                        }).catch((error) => {
                            console.log("Received Error: ", error);
                            console.log("Database not ready yet .... populating data");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS Recipes (id, name, description, image, ingredientsList)');
                            }).then(() => {
                                console.log("Table created succesfully");
                            }).catch(() => {
                                console.log(error)
                            });
                        })
                        resolve(db);
                    })
                    .catch(error => {
                        console.log(error)
                    });
                })
                .catch(error => {
                    console.log("Echo Test Failed - plugin not functional");
                })
        });
    }

    closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };

    listRecipe() {
        return new Promise((resolve) => {
          const recipes = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT id, name, description FROM Recipes', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Recipe ID: ${row.id}, REcipe Name: ${row.name}`)
                  const { id, name, description } = row;
                  recipes.push({
                    id,
                    name,
                    description
                  });
                }
                console.log(recipes);
                resolve(recipes);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

    recipeById(id) {
        console.log(id);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Recipes WHERE id = ?', [id]).then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

    addRecipe(rec) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO REcipes VALUES (?, ?, ?, ?, ?)', [rec.id, rec.name, rec.description, rec.image, rec.ingredientsList]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }    
}