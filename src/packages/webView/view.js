'https://github.com/atom/electron/blob/master/docs/api/webview-tag.md';
`<div id="controls">

      <button id="back" title="Go Back" disabled="true">&#9664;</button>
      <button id="forward" title="Go Forward" disabled="true">&#9654;</button>
      <button id="home" title="Go Home">&#8962;</button>
      <button id="reload" title="Reload">&#10227;</button>

      <form id="location-form">
        <div id="center-column">
          <input id="location" type="text" value="http://www.github.com/">
        </div>
        <input type="submit" value="Go">
      </form>

      <button id="zoom" title="Change Zoom">&#128270;</button>
      <button id="find" title="Find in Page">&#128294;</button>

    </div>

    <div id="zoom-box">
      <form id="zoom-form">
        <input id="zoom-text" type="text">
        <input type="submit" value="&#128270;">
        <button id="zoom-in">&#10133;</button>
        <button id="zoom-out">&#10134;</button>
      </form>
    </div>

    <div id="find-box">
      <form id="find-form">
        <input id="find-text" type="text">
        <div id="find-results"></div>
        <input type="submit" style="position:absolute; visibility:hidden">
        <button id="match-case">aA</button>
        <button id="find-backward">&#60;</button>
        <button id="find-forward">&#62;</button>
      </form>
    </div>

    <webview src="http://www.github.com/" style="width:640px; height:480px"></webview>

    <div id="sad-webview">
      <div id="sad-webview-icon">&#9762;</div>
      <h2 id="crashed-label">Aw, Snap!</h2>
      <h2 id="killed-label">He's Dead, Jim!</h2>

      <p>Something went wrong while displaying this webpage.
      To continue, reload or go to another page.</p>
    </div>`;

    `body {
  margin: 0;
  padding: 0;
  font-family: Lucida Grande, Arial, sans-serif;
}

button,
input {
  outline: none;
}

#controls {
  padding: 3px;
  border-bottom: solid 1px #ccc;
  background-color: #eee;
}

#controls button,
#controls input {
  font-size: 14px;
  line-height: 24px;
  border-radius: 2px;
  padding: 0 6px;
}

button,
input[type="submit"],
button[disabled]:hover {
  border: solid 1px transparent;
  background: transparent;
}

button:hover,
input[type="submit"]:hover {
  border-color: #ccc;
  background: -webkit-linear-gradient(bottom, #cccccc 0%, #f2f2f2 99%);
}

button:active,
input[type="submit"]:active {
  border-color: #bbb;
  background: -webkit-linear-gradient(bottom, #e2e2e2 0%, #bbbbbb 99%);
}

/* These glyphs are on the small side, make them look more natural when
compared to the back/forward buttons */
#controls #home,
#controls #terminate {
  font-size: 24px;
}

#controls #reload {
  font-size: 20px;
}

#controls #zoom,
#controls #find {
  font-size: 18px;
}

#location {
  border: solid 1px #ccc;
  padding: 2px;
  width: 100%;
  -webkit-box-sizing: border-box;
}

#controls {
  display: -webkit-flex;
  -webit-flex-direction: column;
}

#controls #location-form {
  -webkit-flex: 1;
  display: -webkit-flex;
  -webit-flex-direction: column;
}

#controls #center-column {
  -webkit-flex: 1;
}

#zoom-box,
#find-box {
  background-color: #eee;
  border: solid 1px #ccc;
  border-top: solid 1px #eee;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 2px;

  position: fixed;
  top: 36px;
  height: 25px;

  display: none;
}

#zoom-box #zoom-form,
#find-box #find-form {
  -webkit-flex: 1;
  display: -webkit-flex;
  -webit-flex-direction: row;
}

#zoom-box input,
#zoom-box button,
#find-box button {
  border-radius: 2px;
}

#zoom-box #zoom-text,
#find-box #find-text {
  border: solid 1px #ccc;
  margin-right: 0px;
  padding: 2px;
  -webkit-box-sizing: border-box;
  -webkit-flex: 1;
}

#zoom-box {
  left: 5px;
  width: 125px;
  z-index: 1;
}

#zoom-box input[type="submit"] {
  font-size: 14px;
  margin: 2px 0px;
  padding: 0 2px 3px 2px;
  width: 22px;
}

#zoom-box button {
  font-size: 12px;
  margin: 2px 0px;
  padding: 0px 1px 0px 0px;
  width: 20px;
}

#find-box {
  right: 5px;
  width: 280px;
  z-index: 2;
}

#find-box #find-text {
  border-right-style: none;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}

#find-box #find-results {
  color: #888;
  background-color: #fff;
  border: solid 1px #ccc;
  border-left-style: none;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  margin: 2px 0px;
  padding: 3px 4px 2px 0;
  text-align: center;
}

#find-box #match-case {
  margin: 2px 0px;
  font-size: 10px;
  width: 28px;
}

#find-box #find-backward,
#find-box #find-forward {
  font-size: 14px;
  width: 24px;
}

#sad-webview,
webview {
  position: absolute;
  bottom: 0;
  left: 0;
}

/* The reload button turns into a spinning trobber */
.loading #reload {
  -webkit-animation: spinner-animation .5s infinite linear;
  -webkit-transform-origin: 50% 55.5%;
}

@-webkit-keyframes spinner-animation {
  0% { -webkit-transform: rotate(0deg); }
  100% {-webkit-transform: rotate(360deg); }
}

/* Due to http://crbug.com/156219 we can't use display: none */
#sad-webview,
.exited webview {
  visibility: hidden;
  visibility: hidden;
}

.exited #sad-webview {
  visibility: visible;
  background: #343f51;
  text-align: center;
  color: #fff;
}

#sad-webview h2 {
  font-size: 14px;
}

#sad-webview p {
  font-size: 11px;
}

#sad-webview-icon {
  font-size: 96px;
  margin-bottom: 10px;
}

/* Variant of the crashed page when the process is intentionally killed (in that
case we use a different background color and label). */
.exited #sad-webview #killed-label {
  display: none;
}

.killed #sad-webview {
  background: #393058;
}

.killed #sad-webview #killed-label {
  display: block;
}

.killed #sad-webview #crashed-label {
  display: none;
}`