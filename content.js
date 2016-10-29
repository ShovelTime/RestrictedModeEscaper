// -- Document Ready Function
$(document).ready(function() {
  // -- Get the usernames stored on Chrome Settings
  if(window.location.href.contains("youtube") && window.location.href.contains("watch?v=")) {
    console.log("RestrictedModeEscaper Initialized!");
    contentScriptYouTube();
    return;
  }
  if($("iframe[src*='youtube.com']").length) {
    contentScriptIframe();
  }
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

function contentScriptIframe() {
  $("iframe[src*='youtube.com']").each(function(index) {
    var src = this.getAttribute("src");
    var height = this.clientHeight;
    var width = this.clientWidth;
    if(!src.contains("videoseries") && src.contains("youtube.com/embed")) {
      var parts1 = src.split("/embed/");
      var parts2 = parts1[1].split("?");
      $(this).replaceWith("<iframe allowfullscreen='allowfullscreen' style='height:" + height + "px;width:" + width + "px' src=\"https://www.youtube-nocookie.com/embed/" + parts2[0] + "?wmode=transparent&iv_load_policy=3&autoplay=0&html5=1&showinfo=1&rel=1&modestbranding=0&playsinline=1&theme=light\"></iframe>");
    }
  });
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
  if(!~$("#player-unavailable .content h1#unavailable-message").html().indexOf("This video is restricted. Try signing in with a Google Apps account.")) {
    console.info("[RME] RME has detected that this video is not available for another reason!");
    return;
  }
  console.log("[RME] RME has detected that this YouTube video is restricted!");
  if(confirm("This video is restricted on your device. However, you have the epic RestrictedModeEscaper installed. Click OK to watch this video.\n\nComments, descriptions, and other material related to the video will not load. Only the video will be available.")) {
    $("#player-unavailable").html("<iframe allowfullscreen='allowfullscreen' style=\"width:100%;height:100%\" src=\"https://www.youtube-nocookie.com/embed/" + getParameterByName("v") + "?wmode=transparent&iv_load_policy=3&autoplay=1&html5=1&showinfo=1&rel=1&modestbranding=0&playsinline=1&theme=light\"></iframe>");
  }
}