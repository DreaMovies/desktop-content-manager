var OpenLink = function(){

	var link = document.getElementById('external-link').value;
	
	if (!/^(f|ht)tps?:\/\//i.test(link)) {
		link = "http://" + link;
	}

	util_tools.createLoading();
	console.log("External Link loading: " + link);
	freedom.view.ExternalView( link );
};

var external = function(){
	util_tools.createLoading();
	console.log("External Link Request");
	freedom.view.ExternalLink();
};




module.exports = {
	external: external,
	OpenLink: OpenLink
}