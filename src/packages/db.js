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
var getDB = function(table) {
	if(db[table]) {
		return db[table];
	} else {
		var dir_BD = './../data/';

		if (!fs.existsSync(dir_BD)){
			fs.mkdirSync(dir_BD);
		}

		var tableFile = './../data/' + table + '.json';
		var thisDb = new Datastore({ filename: tableFile });
		db[table] = thisDb;
		return thisDb;
	}
};

var loadDB = function(table) {
	var thisDb = local_DB.getDB(table);
	thisDb.loadDatabase(function (err) {
	  // perform something  
	});
};


var insertInDB = function(data){
	db.insert(data, function (err, newDoc) {   // Callback is optional
		// newDoc is the newly inserted document, including its _id
		// newDoc has no key called notToBeSaved since its value was undefined
	});
};

var findOneInDB = function(field, value){
	// The same rules apply when you want to only find one document
	db.findOne({ field: value }, function (err, doc) {
		// doc is the document Mars
		// If no document is found, doc is null
	});
};

var findInDB = function(field, value){
	// Finding all planets in the solar system
	db.find({ field: value }, function (err, docs) {
		// docs is an array containing documents Mars, Earth, Jupiter
		// If no document is found, docs is equal to []
	});
};

var deleteInDB = function(field, value, multi = false){
	// Remove one document from the collection
	// options set to {} since the default for multi is false
	db.remove({ field: value }, {multi: multi}, function (err, numRemoved) {
		// multi: false = numRemoved = 1
		// multi: true = numRemoved = 3
		// All planets from the solar system were removed
	});
};

var deleteFileInDB = function(field, value, multi = false){
	// Removing all documents with the 'match-all' query
	db.remove({}, { multi: true }, function (err, numRemoved) {
	});
};


module.exports = {
	getDB: getDB,
	loadDB: loadDB,
	insertInDB: insertInDB,
	findOneInDB: findOneInDB,
	findInDB: findInDB,
	deleteInDB: deleteInDB,
	deleteFileInDB: deleteFileInDB
};