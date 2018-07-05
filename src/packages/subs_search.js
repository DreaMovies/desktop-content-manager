
var getSubtitle = function (name, path) {
    console.log("getSubtitle - Name: " + name);
    console.log("getSubtitle - Path: " + path);

    config_OS = this.getType(name, path);

    console.log("getSubtitle - config_OS: ");
    console.log(config_OS);

    OS.search(config_OS).then(subtitles => {

        if (Object.keys(subtitles).length > 0) {
            console.log('Subtitle found:' + Object.keys(subtitles).length);

            var sub_folder = path + "/subs/";
            var sub_folder_vtt = sub_folder + "/vtt/";

            Object.keys(subtitles).forEach(function(key) {
                if (!fs.existsSync(sub_folder)){
                    fs.mkdirSync(sub_folder);
                }
                if (!fs.existsSync(sub_folder_vtt)){
                    fs.mkdirSync(sub_folder_vtt);
                }
                //console.log(key, subtitles[key].filename);
                var fileUrl = subtitles[key].url;
                var output = sub_folder + key + "_" + subtitles[key].filename
                request({url: fileUrl, encoding: null}, function(err, resp, data) {
                    if(err) throw err;
                    require('zlib').unzip(data, (error, buffer) => {
                        if (error) throw error;
                        subtitle_content = iconv.decode(buffer, subtitles[key].encoding);

                        sub_write = fs.writeFileSync(output, subtitle_content);/*, function(err) {
                            console.log("file written! " + key + " -> " + subtitles[key].filename);
                            /*fs.createReadStream(output)
                                .pipe(srt2vtt())
                                .pipe(fs.createWriteStream('some-html5-video-subtitle.vtt'))* /
                        });*/

                        console.log("file written! " + key + " -> " + subtitles[key].filename);
                        console.log(sub_write);

                        //var srtData = fs.readFileSync(output);
                        fs.createReadStream(output)
                          .pipe(srt2vtt())
                          .pipe(fs.createWriteStream(sub_folder_vtt + key + "_" + (subtitles[key].filename).split(".srt")[0] + '.vtt'))
                        /*srt2vtt(srtData, function(err, vttData) {
                            console.log("SRT 2 VTT");
                            console.log(vttData);
                            if (err) throw new Error(err);
                            fs.writeFileSync(output + (subtitles[key].encoding).split(".str")[0] + '.vtt', vttData);
                        });*/
                            
                    });
                    console.log("Subtitles done");
                });
            });
            refreshFolder(path);
        } else {
            throw 'no subtitle found';
        }
    }).catch(console.error);
};

var getType = function(name, path){
    var regex = /[sS]?0*(\d+)?[Ee]0*(\d+)/g;
    var show_info;

    treated_name = name.split("1080p").join('.').split("720p").join('.').split("480p");
    treated_name = treated_name[0].replace(".", " ");

    if ((show_info = regex.exec(name)) !== null) {
        config_OS = {
            //filename:     name + path,
            query:          treated_name,
            sublanguageid:  'eng,fre,por,deu,ita,spa,ell,pol',
            season:         show_info[1],
            episode:        show_info[2],
            gzip:           true,
            extensions: ['vtt','srt'], 
        };
    } else {
        config_OS = {
            //filename:     name + path,
            query:          treated_name,
            sublanguageid:  'eng,fre,por,deu,ita,spa,ell,pol',
            gzip:           true,
            extensions: ['vtt','srt'],
        };
    }
    return config_OS;
};


var getSubtitleAdvanced = function(name, path){
    var sub_folder = path + "/subs/";

    if (!fs.existsSync(sub_folder)){
        fs.mkdirSync(sub_folder);
    }
    fs.writeFile(output, subtitle_content, function(err) {
        console.log("file written! " + key + " -> " + subtitles[key].filename);
    });
};

module.exports = {
    getSubtitle: getSubtitle,
    getType: getType,
    getSubtitleAdvanced: getSubtitleAdvanced
};


/*
/**	***********
	Example
  **************

OpenSubtitles.search({
    sublanguageid: 'fre',       // Can be an array.join, 'all', or be omitted.
    hash: '8e245d9679d31e12',   // Size + 64bit checksum of the first and last 64k
    filesize: '129994823',      // Total size, in bytes.
    path: 'foo/bar.mp4',        // Complete path to the video file, it allows
                                //   to automatically calculate 'hash'.
    filename: 'bar.mp4',        // The video file name. Better if extension
                                //   is included.
    season: '2',
    episode: '3',
    extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
    limit: '3',                 // Can be 'best', 'all' or an
                                // arbitrary nb. Defaults to 'best'
    imdbid: '528809',           // 'tt528809' is fine too.
    fps: '23.96',               // Number of frames per sec in the video.
    query: 'Charlie Chaplin',   // Text-based query, this is not recommended.
    gzip: true                  // returns url to gzipped subtitles, defaults to false
}).then(subtitles => {
    // an array of objects, no duplicates (ordered by
    // matching + uploader, with total downloads as fallback)

    subtitles = Object {
        en: {
            downloads: "432",
            encoding: "ASCII",
            id: "192883746",
            lang: "en",
            langName: "English",
            score: 9,
            url: "http://dl.opensubtitles.org/download/subtitle_file_id",
            filename: "some_movie.tag.srt"
        }
        fr: {
            download: "221",
            encoding: "UTF-8",
            id: "1992536558",
            lang: "fr",
            langName: "French",
            score: 6,
            url: "http://dl.opensubtitles.org/download/subtitle_file_id",
            filename: "some_movie.tag.srt"
        }
    }
});
*/