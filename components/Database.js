import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline5.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class Database {

	initDB() {
		let db;
		return new Promise((resolve) => {
			//console.log("Plugin integrity check ...");
			SQLite.echoTest()
				.then(() => {
					//console.log("Integrity check passed ...");
					//console.log("Opening database ...");
					SQLite.openDatabase(
						database_name,
						database_version,
						database_displayname,
						database_size
					)
						.then(DB => {
							db = DB;
							//console.log("Database OPEN");
							db.executeSql('SELECT 1 FROM Items LIMIT 1').then(() => {
								//console.log("Database is ready ... executing query ...");
							}).catch((error) => {
								//console.log("Received error: ", error);
								//console.log("Database not yet ready ... populating data");
								db.transaction((tx) => {
									tx.executeSql(`CREATE TABLE IF NOT EXISTS "Items" (
                            "itemID"	INTEGER PRIMARY KEY AUTOINCREMENT,
                            "itemName"	TEXT,
                            "dateAdded"	TEXT
                        );`);
								}).then(() => {
									//console.log("Table created successfully");
								}).catch(error => {
									//console.log(error);
								});
							});
							resolve(db);
						})
						.catch(error => {
							//console.log(error);
						});
				})
				.catch(error => {
					//console.log("echoTest failed - plugin not functional");
				});
		});
	};

	closeDatabase(db) {
		if (db) {
			//console.log("Closing DB");
			db.close()
				.then(status => {
					//console.log("Database CLOSED");
				})
				.catch(error => {
					//console.log("Close DB error")
				});
		} else {
			//console.log("Database was not OPENED");
		}
	};

	getItems(order) {
		return new Promise((resolve) => {
			const items = [];
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql('SELECT i.itemID, i.itemName, i.dateAdded FROM Items i ORDER BY i.itemID ' + order, []).then(([tx, results]) => {
						//console.log("Query completed");
						var len = results.rows.length;
						for (let i = 0; i < len; i++) {
							let row = results.rows.item(i);
							//console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
							const { itemID, itemName, dateAdded } = row;
							items.push({
								itemID,
								itemName,
								dateAdded
							});
						}
						//console.log(products);
						resolve(items);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					//console.log(err);
				});
			}).catch((err) => {
				//console.log(err);
			});
		});
	}

	getItem(id) {
		//console.log(id);
		return new Promise((resolve) => {
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql('SELECT * FROM Items WHERE itemID = ?', [id]).then(([tx, results]) => {
						//console.log(results);
						if (results.rows.length > 0) {
							let row = results.rows.item(0);
							resolve(row);
						}
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					//console.log(err);
				});
			}).catch((err) => {
				//console.log(err);
			});
		});
	}

	addItem(item) {
		return new Promise((resolve) => {
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql('INSERT INTO Items VALUES (?, ?, CURRENT_TIMESTAMP)', [item.itemID, item.itemName]).then(([tx, results]) => {
						resolve(results);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					//console.log(err);
				});
			}).catch((err) => {
				//console.log(err);
			});
		});
	}

	updateItem(id, item) {
		return new Promise((resolve) => {
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql('UPDATE Items SET itemName = ? WHERE itemID = ?', [item.itemName, id]).then(([tx, results]) => {
						resolve(results);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					//console.log(err);
				});
			}).catch((err) => {
				//console.log(err);
			});
		});
	}

	deleteItem(id) {
		return new Promise((resolve) => {
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql('DELETE FROM Items WHERE itemID = ?', [id]).then(([tx, results]) => {
						//console.log(results);
						resolve(results);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					//console.log(err);
				});
			}).catch((err) => {
				//console.log(err);
			});
		});
	}

}