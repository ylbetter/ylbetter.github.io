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
video_id = param[1].replace(/\?.*/, '').split("&")[0];
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
        document.getElementById("viewersCount").style.display = "none" :
        document.getElementById("viewersCount").innerHTML = data.items[0].liveStreamingDetails.concurrentViewers;
      
      if (data.items[0].snippet.liveBroadcastContent === "none")
        document.getElementById("vi").style.display = "none";
      
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


function chat() { 
  document.getElementById("ytchat").src = "https://www.youtube.com/live_chat?v=" + video_id + "&embed_domain=" + window.location.hostname;
  
  // document.getElementById("ytplayer").src = "https://invidious.silkky.cloud/embed/" + video_id;
  
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
      document.getElementById("CHchannelName").title = out.userList[0].user.name;
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
  if (bytes === 0 || bytes === null) return '';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function WidthHeight(width, height) {
  if (width === null) return 'audio only';
  return width + 'x' + height + 'p';
}

function fpsReplace(fps) {
  if (fps === null) return '';
  return ' @ ' + fps + 'fps ';
}

function AudioOrVideo(asr) {
  if (asr === null) return ' video only';
  return '';
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
        str += '<span class="formattext">' + WidthHeight(tags.formats[i].width, tags.formats[i].height) + fpsReplace(tags.formats[i].fps) + AudioOrVideo(tags.formats[i].asr) + '<span class="bytesibtn">' + formatBytes(tags.formats[i].filesize) + '<a class="mdi mdi-download" href="' + tags.formats[i].url + '">Download</a></span></span>';
        else
        str += '<span class="formattext">'+ WidthHeight(tags.formats[i].width, tags.formats[i].height) + fpsReplace(tags.formats[i].fps) + ' ' + tags.formats[i].tbr + 'Kbps/s' + '<a class="mdi mdi-download" style="padding-left: 10px;" href="' + tags.formats[i].url + '"> Download</a></span>';
      }

      document.getElementById("dl").style.display = 'flex';
      document.getElementById('downloadLinks').innerHTML = str;
      document.getElementById('downloadLinks').innerHTML += '<span class="formattext">Manifest hls_playlist <a class="mdi mdi-download" href="' + tags.url + '"> Download</a></span>';

      videojs('my_video_1').src([
        {
        notSupportedMessage: "play",
        type: 'application/x-mpegURL',
        // poster: 'https://i.ytimg.com/vi/' + video_id + '/maxresdefault.jpg',
        src: tags.manifest_url,
        },
      ]);

      videojs('my_video_1').ready(function() {
        this.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false
        });
      });

    })
    .catch((err) => {
      throw err;
    });
}

downLinks()

setTimeout(() => {chInfo()}, 1000);
setInterval(getViews, 10000); // 10 second
setInterval(InfoYouTube, 1000); // 1 second
