//to upload files to openload 
const openload = require('node-openload');

const ol = openload({
  api_login: 'a64a34a4c8e16c20',
  api_key: 'umPGoUXZ',
});

var filepath = "feeds/Silicon.Valley.S01E01.HDTV.x264-KILLERS.mp4";

ol.getAccountInfo().then(info => console.log(info));   // Prints account info 

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
ol.upload({
  file: filepath,        
  folder: "4349015"
}).then(info => console.log(info));   // Prints upload info