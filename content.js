// -- Document Ready Function
$(document).ready(function() {
  // -- Get the usernames stored on Chrome Settings
  console.log("RestrictedModeEscaper Initialized!");
  contentScriptYouTube();
});
//Main content
String.prototype.contains = function(string) {
  return (this.indexOf(string) != -1);
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function contentScriptYouTube() {
  if(!window.location.href.contains("youtube") || !window.location.href.contains("watch?v=")) {
    console.info("[RME] RestrictedModeEscaper has detected that this page is not a video, and therefore has stopped its function.");
    return;
  }
  if(window.location.href.contains("youtube") && $("#player-unavailable").hasClass("hid")) {
    console.info("[RME] RME has detected that this video is not restricted on your device!");
    return;
  }
  console.log("[RME] RME has detected that this YouTube video is restricted!");
  if(confirm("This video is restricted on your device. However, you have the epic RestrictedModeEscaper by FoxInFlame installed. Click OK to watch this video.")) {
    window.open("https://www.youtube-nocookie.com/embed/" + getParameterByName("v") + "?wmode=transparent&iv_load_policy=3&autoplay=1&html5=1&showinfo=1&rel=0&modestbranding=1&playsinline=1&theme=light");
  }
}