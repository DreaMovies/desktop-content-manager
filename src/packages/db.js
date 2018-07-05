//https://github.com/louischatriot/nedb

var file_struture = {
	created_at: new Date(),
	uploaded: true,
	uploaded_at: new Date(),
	name: "name of file",
	type: "movie",
	path: 'path/to/file.mp4',
	subtitles: {
		eng: "path/to/file.str",
		fre: "path/to/file.str",
		por: "path/to/file.str",
		deu: "path/to/file.str",
		ita: "path/to/file.str",
		spa: "path/to/file.str",
		ell: "path/to/file.str",
		pol: "path/to/file.str"
	}
};

var settings_structure = {
	paths: {
		app: null,
		desktop: null,
		downloads: null,
	},
};



/*db_test = new Datastore({ filename: './data/settings.json', autoload: true });

var doc = 	{
				name: 'product001',
				quantity : 100
			};

db_test.insert(doc, function (err, newDoc) {  
  // newDoc is the newly inserted document
      console.log("DB: Test New");
      console.log(newDoc);
});
db_test.find({ name: 'product001' }, function (err, docs) {
      // results
      console.log("DB: Test find");
      console.log(docs);
});*/


var getDB = function(table) {
	if(db[table]) {
		return db[table];
	} else {
		var dir_BD = './data/';

		if (!fs.existsSync(dir_BD)){
			fs.mkdirSync(dir_BD);
		}

		var tableFile = './data/' + table + '.json';
		var thisDb = new Datastore({ filename: tableFile, autoload: true });
		db[table] = thisDb;
		return thisDb;
	}
};

var loadDB = function(table) {
	var thisDb = local_DB.getDB(table);
	thisDb.loadDatabase(function (err) {
		// perform something
		console.log('DB Load: ' + table);
	});
};


var insertInDB = function(table, data){
	db[table].insert(data, function (err, newDoc) {   // Callback is optional
		// newDoc is the newly inserted document, including its _id
		// newDoc has no key called notToBeSaved since its value was undefined
		console.log("Table: " + table);
		console.log("New Record Saved.");
		console.log(newDoc);
	});
};

var findOneInDB = function(table, field, value){
	// The same rules apply when you want to only find one document
	db[table].findOne({ field: value }, function (err, doc) {
		// doc is the document Mars
		// If no document is found, doc is null
	});
};

var findInDB = function(table, field, value){
	// Finding all planets in the solar system
	db[table].find({ field: value }, function (err, docs) {
		// docs is an array containing documents Mars, Earth, Jupiter
		// If no document is found, docs is equal to []
	});
};

var findAllInDB = function(table, field, value){
	// Finding all planets in the solar system
	db[table].find({}, function (err, docs) {

	});
};

var deleteInDB = function(table, field, value, multi = false){
	// Remove one document from the collection
	// options set to {} since the default for multi is false
	db[table].remove({ field: value }, {multi: multi}, function (err, numRemoved) {
		// multi: false = numRemoved = 1
		// multi: true = numRemoved = 3
		// All planets from the solar system were removed
	});
};

var deleteFileInDB = function(table, field, value, multi = false){
	// Removing all documents with the 'match-all' query
	db[table].remove({}, { multi: true }, function (err, numRemoved) {
	});
};


var loadSettingsDB = function() {
	if(db['settings']) {
	} else {
		var dir_BD = './data/';

		if (!fs.existsSync(dir_BD)){
			fs.mkdirSync(dir_BD);
		}

		var tableFile = './data/settings.json';
		var thisDb = new Datastore({ filename: tableFile, autoload: true });
		db['settings'] = thisDb;
	}
	var thisDb = db['settings'];
	var db_count = 0;

	thisDb.find( function (err, docs) {
		// results
		console.log("DB: Settings find");
		console.log(docs);
	});
	
	var test_count = "";

	thisDb.count({}, function (err, count) {
					// count equals to 4
		console.log("DB: Settings Count");
		console.log(count);
		db_count = count;
	});

	if(db_count == 0){
		var settings_structure = {
			paths: {
				app: app.getPath("userData"),
				desktop: app.getPath("desktop"),
				downloads: app.getPath("downloads"),
			},
		};
		this.insertInDB('settings', settings_structure);
	}
};

module.exports = {
	getDB: getDB,
	loadDB: loadDB,
	insertInDB: insertInDB,
	findOneInDB: findOneInDB,
	findInDB: findInDB,
	findAllInDB: findAllInDB,
	deleteInDB: deleteInDB,
	deleteFileInDB: deleteFileInDB,
	loadSettingsDB: loadSettingsDB
};