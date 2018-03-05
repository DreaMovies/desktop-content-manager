var ExternalLink = function(link){
	var link_html = '<form class="ui form">' +
		'	<div class="field">' +
		'		<label>External Link</label>' +
		'		<input type="text" name="external-link" id="external-link" placeholder="External Link">' +
		'	</div>' +
		'	<button class="ui button" onclick="freedom.controler.OpenLink()">Submit</button>' +
		'</form>';
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content">' + link_html + '</div>';
};

var ExternalView = function(link){
	var link_html = '<iframe class="iframe-external" src="' + link + '" onload="this.style.height=this.contentDocument.body.scrollHeight +\'px\';"></iframe>';
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content external-content">' + link_html + '</div>';
};



module.exports = {
	ExternalView: ExternalView,
	ExternalLink: ExternalLink
}