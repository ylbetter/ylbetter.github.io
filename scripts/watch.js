var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 
// 
var youTubePlayer;
function onYouTubeIframeAPIReady() {
  "use strict";

  var youTubePlayerVolumeItemId = "YouTube-player-volume";

  function onStateChange(event) {
    var volume = Math.round(event.target.getVolume());
    var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

    if (volumeItem && Math.round(volumeItem.value) != volume) {
      volumeItem.value = volume;
    }
  }

  youTubePlayer = new YT.Player("ytplayer", {
    videoId: video_id,
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      ecver: 2
    },
    events: {
      onStateChange: onStateChange,
    },
  });
  youTubePlayer.personalPlayer = {
    currentTimeSliding: false,
    errors: [],
  };
}


function youTubePlayerActive() {
  "use strict";
  return youTubePlayer && youTubePlayer.hasOwnProperty("getPlayerState");
}

function youTubePlayerVolumeChange(volume) {
  "use strict";

  if (youTubePlayerActive()) {
    youTubePlayer.setVolume(volume);
  }
}

function hideChatBtn() {
  var ytchat = document.getElementById("right_panel"),
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
}, 1000);

// 
var url = 'https://www.youtube.com/live_chat' + window.location.search ;
function popupChat() { 
  window.open(url, 'popup', 'width=400,height=850.78');
  hideChatBtn();
}


/*

YouTube Counter

*/
var param = window.location.search.split("?v=");
video_id = param[1].replace(/\?.*/, '');
getViews();

      
function getViews() {
  fetch(
    `https://mixerno.space/api/yt/video/${video_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      mixerno = data;
      console.log(data);
      channel_ID = data.items[0].snippet.channelId;
      // Имя канала
      document.title = data.items[0].snippet.title;
      // Миниатюра видео
      //document.getElementById("YTthnail").src = data.items[0].snippet.thumbnails.maxres.url;
      // Название трансляции
      document.getElementById("title").innerHTML = data.items[0].snippet.title;
      // Описание
      data.items[0].snippet.description.length === 0 ?
        document.getElementById("ds").style.display = "none" :
        document.getElementById("description").innerHTML = urlify(data.items[0].snippet.description);
      
      // Публикация
      document.getElementById("publishedAt").innerHTML = new Date(
        data.items[0].snippet.publishedAt
      ).toLocaleString();
      // Просмотров всего
      document.getElementById("viewCount").innerHTML = data.items[0].statistics.viewCount;
    
      // Трансляция запланирована
    ((data.items[0].liveStreamingDetails === undefined) || (data.items[0].liveStreamingDetails.scheduledStartTime === undefined)) ?
      document.getElementById("planned").style.display = "none" :
        document.getElementById("scheduledStartTime").innerHTML = new Date(data.items[0].liveStreamingDetails.scheduledStartTime).toLocaleString();
      
            
      // Время начала трансляции
      ((data.items[0].liveStreamingDetails === undefined) || (data.items[0].liveStreamingDetails.actualStartTime === undefined)) ?
        document.getElementById("started").style.display = "none" :
        document.getElementById("actualStartTime").innerHTML = new Date(
          data.items[0].liveStreamingDetails.actualStartTime
        ).toLocaleString();
      
      // Трансляция завершена
      ((data.items[0].liveStreamingDetails === undefined) || (data.items[0].liveStreamingDetails.actualEndTime === undefined)) ?
        document.getElementById("ended").style.display = "none" :
        document.getElementById("actualEndTime").innerHTML = new Date(
          data.items[0].liveStreamingDetails.actualEndTime
        ).toLocaleString();
      
      // Зрителей на трансляции
      data.items[0].snippet.liveBroadcastContent === "none" ?
        document.getElementById("viewersCount").innerHTML = 0 :
        document.getElementById("viewersCount").innerHTML = data.items[0].liveStreamingDetails.concurrentViewers;
      
      // Теги
        data.items[0].snippet.tags === undefined ?
          document.getElementById("tg").style.display = "none":
        document.getElementById("tags").innerHTML = data.items[0].snippet.tags.join('<br>');

      // Лайки
      var likes = data.items[0].statistics.likeCount === undefined ? 0 : data.items[0].statistics.likeCount;
      document.getElementById("likesCount").innerHTML = likes;

      // Дизлайки
      var dislikes = data.items[0].statistics.dislikeCount === undefined ? 0 : data.items[0].statistics.dislikeCount;
      document.getElementById("dislikeCount").innerHTML = dislikes;

      /*
      Percent Likes
      */
      data.items[0].statistics.likeCount === undefined ?
        document.getElementById("likeProgress").value = 0 :
        document.getElementById("likeProgress").value = Math.round(100 * likes / (+likes + + +dislikes));
    })
    .catch((err) => {
      throw err;
    });
}

/*


*/

function urlify(text) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  //var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url, b, c) {
    var url2 = c == "www." ? "http://" + url : url;
    return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
  });
}

function CHredirect() {
  window.open('https://www.youtube.com/channel/' + channel_ID);
}

function convertTime (t){
  return parseInt(t/86400)+' суток '+(new Date(t%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/, "$1:$2:$3");
}

function InfoYouTube() {
  YTinfo.innerHTML = convertTime(youTubePlayer.getCurrentTime());
}

function chat() { 
  document.getElementById("ytchat").src = "https://www.youtube.com/live_chat?v=" + video_id + "&embed_domain=" + window.location.hostname;
  
  setTimeout(() => {
    document.getElementById("loading").remove()
  }, 2000);
}

function chInfo() {
  fetch(
    `https://beta.mixerno.space/api/youtube-subscriber-counter/channel/` +
    channel_ID
  )
    .then((res) => res.json())
    .then((out) => {
      console.log(out);
      // Имя канала
      document.getElementById("CHchannelName").innerHTML = out.userList[0].user.name;
      // Кол-во подписчиков на канале
      document.getElementById("CHsubscribersCountAPI").innerHTML = out.userList[0].stats.subscriberCountAPI;
      // Кол-во видео на канале
      document.getElementById("CHvideoCount").innerHTML = out.userList[0].stats.videoCount;
      // Просмотров на канале
      document.getElementById("CHviewCount").innerHTML = out.userList[0].stats.viewCount;
      // Аватар канала
      document.getElementById("CHavatar").src =
        out.userList[0].user.avatar.high.url;
    })
    .catch((err) => {
      throw err;
    });
}

/*

Download Links

*/

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


function downLinks() {
  fetch(
    `https://youtube-api.browjob.repl.co/youtube/v3/yt-dl/`+ video_id +`?pretty`
  )
    .then((res) => res.json())
    .then((tags) => {
      console.log(tags);
      let str = '';
      for (let i = 0; i < tags.formats.length; i++) {
        if (tags.manifest_url == undefined)
        str += '<span class="formattext">' + (i+ +1) + ' - '  + tags.formats[i].format.split('- ')[1] + ' ' + formatBytes(tags.formats[i].filesize) + '<a class="mdi mdi-download" href="' + tags.formats[i].url + '">Download</a></span>';
        else
        str = '<span class="formattext">Manifest url (' + tags.width + 'x' + tags.height + 'p' + tags.fps + 'fps)  ' + ' <a class="mdi mdi-download" href="' + tags.manifest_url + '"> Download</a></span>';
      }
        document.getElementById("dl").style.display = 'flex';
        document.getElementById('downloadLinks').innerHTML = str;

    })
    .catch((err) => {
      throw err;
    });
}

downLinks()

setTimeout(() => {chInfo()}, 1000);
setInterval(getViews, 10000); // 10 second
setInterval(InfoYouTube, 1000); // 1 second

