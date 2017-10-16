//var filepath = "feeds/Silicon.Valley.S01E01.HDTV.x264-KILLERS.mp4";
	/**************
	upload(obj)
	Perform an upload of a local file.
	obj: Object containing data for the upload:
	{
	  file:             // mandatory
	  folder:
	  filename:
	  contentType
	}
	obj.file: A buffer or the local path of your desired file.
	obj.folder: The folder ID you want to upload to. (not required)
	obj.filename: The file's name. (only required if using a buffer)
	obj.contentType: The file's content type. (only required if using a buffer)
	***************/

var getInfo = function () {
	ol.getAccountInfo().then(info => console.log(info));   // Prints account info 
};

var fileUpload = function (fileUrl) {
	//ipcRenderer.send('show-prop1');file_upload
	ol.upload({
		file: fileUrl,
		folder: "4349015"
	}).then(info => console.log(info));   // Prints upload info
};

module.exports = {
	getInfo: getInfo,
	fileUpload: fileUpload
}