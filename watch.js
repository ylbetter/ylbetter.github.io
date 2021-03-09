let params = new URLSearchParams(window.location.search);
function tick() {
  return params.get("v");
}
const VIDEO_ID = tick();

// Video
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youTubePlayer;

function onYouTubeIframeAPIReady() {
  "use strict";

  var videoId = tick();
  var youTubePlayerVolumeItemId = "YouTube-player-volume";

  function onError(event) {
    youTubePlayer.personalPlayer.errors.push(event.data);
  }

  function onReady(event) {
    var player = event.target;

    player.loadVideoById({
      videoId: videoId,
    });
    // player.pauseVideo(); /* Pause after load page */
    // youTubePlayerDisplayFixedInfos();
  }

  function onStateChange(event) {
    var volume = Math.round(event.target.getVolume());
    var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

    if (volumeItem && Math.round(volumeItem.value) != volume) {
      volumeItem.value = volume;
    }
  }

  youTubePlayer = new YT.Player("ytplayer", {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      rel: 1,
      controls: 1,
    },
    events: {
      onError: onError,
      onReady: onReady,
      onStateChange: onStateChange,
    },
  });
  // Add private data to the YouTube object
  youTubePlayer.personalPlayer = {
    currentTimeSliding: false,
    errors: [],
  };
}

/**
 * :return: true if the player is active, else false
 */
function youTubePlayerActive() {
  "use strict";
  return youTubePlayer && youTubePlayer.hasOwnProperty("getPlayerState");
}

/**
 * Get videoId from the #YouTube-video-id HTML item value,
 * load this video, pause it
 * and show new infos.
 */
function youTubePlayerChangeVideoId() {
  "use strict";

  var inputVideoId = document.getElementById("YouTube-video-id");
  var videoId = inputVideoId.value;

  youTubePlayer.cueVideoById({
    suggestedQuality: "tiny",
    videoId: videoId,
  });
  youTubePlayer.pauseVideo();
  youTubePlayerDisplayFixedInfos();
}

/**
 * Seek the video to the currentTime.
 * (And mark that the HTML slider *don't* move.)
 *
 * :param currentTime: 0 <= number <= 100
 */
function youTubePlayerCurrentTimeChange(currentTime) {
  "use strict";

  youTubePlayer.personalPlayer.currentTimeSliding = false;
  if (youTubePlayerActive()) {
    youTubePlayer.seekTo(
      (currentTime * youTubePlayer.getDuration()) / 100,
      true
    );
  }
}

/**
 * Mark that the HTML slider move.
 */
function youTubePlayerCurrentTimeSlide() {
  "use strict";

  youTubePlayer.personalPlayer.currentTimeSliding = true;
}

/**
 * Display embed code to #YouTube-player-fixed-infos.
 */
function youTubePlayerDisplayFixedInfos() {
  "use strict";

  if (youTubePlayerActive()) {
    document.getElementById("YouTube-player-fixed-infos").innerHTML =
      "Embed code: <textarea readonly>" +
      youTubePlayer.getVideoEmbedCode() +
      "</textarea>";
  }
}

/**
 * Display
 *   some video informations to #YouTube-player-infos,
 *   errors to #YouTube-player-errors
 *   and set progress bar #YouTube-player-progress.
 */
function youTubePlayerDisplayInfos() {
  "use strict";

  if (this.nbCalls === undefined || this.nbCalls >= 3) {
    this.nbCalls = 0;
  } else {
    ++this.nbCalls;
  }

  var indicatorDisplay =
    '<span id="indicator-display" title="timing of informations refreshing">' +
    ["|", "/", String.fromCharCode(8212), "\\"][this.nbCalls] +
    "</span>";

  if (youTubePlayerActive()) {
    var state = youTubePlayer.getPlayerState();

    var current = youTubePlayer.getCurrentTime();
    var duration = youTubePlayer.getDuration();
    var currentPercent = current && duration ? (current * 100) / duration : 0;

    var fraction = youTubePlayer.hasOwnProperty("getVideoLoadedFraction")
      ? youTubePlayer.getVideoLoadedFraction()
      : 0;

    var url = youTubePlayer.getVideoUrl();

    if (!current) {
      current = 0;
    }
    if (!duration) {
      duration = 0;
    }

    var volume = youTubePlayer.getVolume();

    if (!youTubePlayer.personalPlayer.currentTimeSliding) {
      document.getElementById("YouTube-player-progress").value = currentPercent;
    }

    document.getElementById("YouTube-player-infos").innerHTML =
      /*indicatorDisplay +*/
      'URL: <a class="url" href="' +
      url +
      '">' +
      url +
      "</a><br>" +
      "Quality: <strong>" +
      youTubePlayer.getPlaybackQuality() +
      "</strong> <br>" +
      "Available quality: <strong>" +
      youTubePlayer.getAvailableQualityLevels() +
      "</strong><br>" +
      "State <strong>" +
      state +
      "</strong>: <strong>" +
      youTubePlayerStateValueToDescription(state) +
      "</strong><br>" +
      "Loaded: <strong>" +
      (fraction * 100).toFixed(1) +
      "</strong>%<br>" +
      "Duration: <strong>" +
      current.toFixed(2) +
      "</strong>/<strong>" +
      duration.toFixed(2) +
      "</strong>s = <strong>" +
      currentPercent.toFixed(2) +
      "</strong>%<br>" +
      "Volume: <strong>" +
      volume +
      "</strong>%";

    document.getElementById("YouTube-player-errors").innerHTML =
      "<div>Errors: <strong>" +
      youTubePlayer.personalPlayer.errors +
      "</strong></div>";
  } else {
    document.getElementById(
      "YouTube-player-infos"
    ).innerHTML = indicatorDisplay;
  }
}

/**
 * Pause.
 */
function youTubePlayerPause() {
  "use strict";

  if (youTubePlayerActive()) {
    youTubePlayer.pauseVideo();
  }
}

/**
 * Play.
 */
function youTubePlayerPlay() {
  "use strict";

  if (youTubePlayerActive()) {
    youTubePlayer.playVideo();
  }
}

/**
 * Return the state decription corresponding of the state value.
 * If this value is incorrect, then return unknow.
 *
 * See values:
 * https://developers.google.com/youtube/iframe_api_reference#Playback_status
 *
 * :param number: any
 * :param unknow: any
 *
 * :return: 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'video cued' or unknow
 */
function youTubePlayerStateValueToDescription(state, unknow) {
  "use strict";

  var STATES = {
    "-1": "unstarted", // YT.PlayerState.
    0: "ended", // YT.PlayerState.ENDED
    1: "playing", // YT.PlayerState.PLAYING
    2: "paused", // YT.PlayerState.PAUSED
    3: "buffering", // YT.PlayerState.BUFFERING
    5: "video cued",
  }; // YT.PlayerState.CUED

  return state in STATES ? STATES[state] : unknow;
}

/**
 * Stop.
 */
function youTubePlayerStop() {
  "use strict";

  if (youTubePlayerActive()) {
    youTubePlayer.stopVideo();
    youTubePlayer.clearVideo();
  }
}

/**
 * Change the volume.
 *
 * :param volume: 0 <= number <= 100
 */
function youTubePlayerVolumeChange(volume) {
  "use strict";

  if (youTubePlayerActive()) {
    youTubePlayer.setVolume(volume);
  }
}

/**
 * Main
 */
// (function () {
//   "use strict";

//   function init() {
//     // Load YouTube library
//     var tag = document.createElement("script");

//     tag.src = "https://www.youtube.com/iframe_api";

//     var first_script_tag = document.getElementsByTagName("script")[0];

//     first_script_tag.parentNode.insertBefore(tag, first_script_tag);

//     // Set timer to display infos
//     setInterval(youTubePlayerDisplayInfos, 1000);
//   }

//   if (window.addEventListener) {
//     window.addEventListener("load", init);
//   } else if (window.attachEvent) {
//     window.attachEvent("onload", init);
//   }
// })();

//
//
//
function hideChatBtn() {
  var ytchat = document.getElementById("ytchat"),
    leftpanel = document.getElementById("left_panel"),
    drag = document.getElementById("drag");
  if (ytchat.style.display === "none") {
    ytchat.style.display = "block";
    leftpanel.style.right = "300px";
    drag.style.display = "block";
  } else {
    ytchat.style.display = "none";
    leftpanel.style.right = "0px";
    drag.style.display = "none";
  }
}

setTimeout(() => {
  hideChatBtn();
  hideChatBtn();
  console.log("[console > watch.js] Page load");
}, 1000);
