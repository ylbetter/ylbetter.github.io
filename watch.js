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
  console.log("[console > watch.js] Page load");
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
var countlength, likes, views, viewsA;
      var param = window.location.search.split("?v=");
      video_id = param[1];
      getViews();
      function updatePage() {
        location.href = `?id=${video_id}`;
      }
      async function getViews() {
        let request = await fetch(
          `https://mixerno.space/api/yt/video/${video_id}`,
          { mode: "cors" }
        );
        let data = await request.json().catch(() => {});

        if (!data.errors) {
          console.log(data);
          document.title = data.items[0].snippet.title;
          // Миниатюра видео
          //document.getElementById("YTthnail").src = data.items[0].snippet.thumbnails.maxres.url;
          // Название трансляции
          document.getElementById("title").innerHTML = data.items[0].snippet.title;
          
          // Описание
          document.getElementById("description").innerHTML = urlify(data.items[0].snippet.description);

          // Публикация
          document.getElementById("publishedAt").innerHTML = new Date(
            data.items[0].snippet.publishedAt
          ).toLocaleString();

          // Просмотров всего
          document.getElementById("viewCount").innerHTML = data.items[0].statistics.viewCount;

          // Лайков
          document.getElementById("likesCount").innerHTML = data.items[0].statistics.likeCount;

          // Дизлайков
          document.getElementById("dislikeCount").innerHTML =
            data.items[0].statistics.dislikeCount;

          /*
          Percent Likes
          */
          var like = data.items[0].statistics.likeCount;
          var dislike = data.items[0].statistics.dislikeCount;
          document.getElementById("likeProgress").value = Math.round(100 * like / (+like+ + +dislike));
          
          // Время начала трансляции
          document.getElementById("actualStartTime").innerHTML = new Date(
            data.items[0].liveStreamingDetails.actualStartTime
          ).toLocaleString();

          // Трансляция запланирована
          document.getElementById("scheduledStartTime").innerHTML = new Date(
            data.items[0].liveStreamingDetails.scheduledStartTime
          ).toLocaleString();

          // Зрителей на трансляции
          document.getElementById("viewersCount").innerHTML =
          data.items[0].liveStreamingDetails.concurrentViewers;
        }
}

function CHredirect() {
  window.open('https://www.youtube.com/channel/' + channelID);
}

function convertTime (t){
  return parseInt(t/86400)+' суток '+(new Date(t%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/, "$1:$2:$3");
}

function InfoYouTube() {
  YTinfo.innerHTML = convertTime(youTubePlayer.getCurrentTime());
}


function urlify(text) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  //var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url, b, c) {
    var url2 = c == "www." ? "http://" + url : url;
    return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
  });
}

function chat() { 
  document.getElementById("ytchat").src = "https://www.youtube.com/live_chat?v=" + video_id + "&embed_domain=" + window.location.hostname;
  
  setTimeout(() => {
    document.getElementById("loading").remove()
  }, 2000);
}


/*

Tags

*/
function downLinks() {
  fetch(
    `https://ytb.trom.tf/api/v1/videos/`+ video_id +`?&pretty=1`
  )
    .then((res) => res.json())
    .then((tags) => {
      console.log(tags);
      // Get channelID
      channelID = tags.authorId;
      // Теги
      var arr = tags.keywords;
      if (arr.length === 0)
        document.getElementById("tags").innerHTML = "Теги не установлены";
      else
        document.getElementById("tags").innerHTML = arr.join('<br>');
      
        // 
        let links = tags.adaptiveFormats;
        let out_arr = document.getElementById('downloadLinks');
        let str = '';
        for (let i = 0; i < links.length; i++) {
          
          if (links[i].url!==undefined, links[i].resolution == undefined) str +='<span>'+ links[i].container + " " + links[i].encoding + "</span>" +links[i].type.replace(/\;.*/, '')+ ' <a href="'+links[i].url+'">Download</a> <br>';
          else 
          str +='<span>'+links[i].resolution+ " </span>" +links[i].type.replace(/\;.*/, '')+ ' <a href="'+links[i].url+'">Download</a> <br>';
        }
        
        out_arr.innerHTML = str;
        
        document.getElementById("formatStreams").innerHTML = '<span>'+ tags.formatStreams[0].container + " " +"</span>" + tags.formatStreams[0].quality +' '+ tags.formatStreams[0].size +' <a href="'+tags.formatStreams[0].url+'">Download</a> <br>';
    })
    .catch((err) => {
      throw err;
    });
}

function chInfo() {
  fetch(
    `https://beta.mixerno.space/api/youtube-subscriber-counter/channel/` +
      channelID
  )
    .then((res) => res.json())
    .then((out) => {
      // console.log(out);
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

downLinks()

setTimeout(() => {chInfo()}, 1000);
setInterval(getViews, 10000); // 10 second
setInterval(InfoYouTube, 1000); // 1 second