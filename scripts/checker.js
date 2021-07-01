const urls =
[
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCN6GNZY8cAhCc1ewXGyDb9A`, // Tupa ez
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCNcuCP5IAI6My3e5Z-vKkBQ`, // VjLink Officical
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCOrraQ1wIEdkHCtZq3zH2oA`, // VjLink НАРЕЗКИ
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCpUpSXoni2C5bp9eBzMnUPA`, // Stethem Team
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCWB2jzhj926UKj9b4bXPttw`, // Stethem Stream
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCBdN3wEYOQ9nJR3BIy9NXxQ`, // Олег Бандит
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCuVzDm4YqXEhLE_RvVT5GAg`, // Kupala TV
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCKaO5Kvxpx6xqNWJN5HGJww`, // АндрейиКо03
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCrEufIi5_5Yn0rk3BrbrFDQ`, // Ваня Филатов
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCZfy_7AcFdTsQWHa6Rb1xGw`, // Вова Фунтик
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UC9mdbw7nIvgQbc83o55IRLg`, // ГОБЗ ШОУ
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCv3z49ZPnPEOnhEkfwPfsVA`, // Михаил Горлачёв свобода от зависимости
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCMsk-hrES4Vr_0ff_0XfJtw`, // ШПУНТ И БРИГАДА
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCKAW3U9zWu-FEL6M28nGmiQ`, // Сутулый почтальон
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCTZ3JhCwdjf9_3P0s6XltEA`, // 47 Хромосома
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCl08lntwp6L8sGX3dUWFqtg`, // Герман Ягодка
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCY6tkAMYby2XJoL8LGj1obQ`, // Tupa Trezvui splash
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCLFIzo0u7Z4mmxJRxpdPhWQ`, // Кирюша LIVE
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCTaj82bdEJ8EzYYmygsL7GQ`, // СЕКТА
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCDxns5jCJ09P4zCe_Kpyblg`, // Бертолет
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCqGZd3yTxWqnXxBm6J9FTlA`, // Tupa Splash
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCMG0wa7TcGGzfVJu2CmVxhQ`, // OZON671GAMES3
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UClzAjKnWSVEXwImRiIEVQ0w`, // Matilda Lando
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCXdyP8qQf26lsADsGp-itjw`, // АндрюхаиКомпания
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCf7GcWt0V6_f8A5UzO48iLw`, // Olisya TS
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCgGWdn-B7XA2ahisWUyCYHg`, // Палата 23    
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCSlgBdZxScyvtEzuZ-x0ekg`, // Из Москвы в Европу. Жизнь с нуля    
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCcRoDJkE4FDDZUTzcBnsnPA`, // никит очка    
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCbTLDSLh1_PNgmFMJ4v-xHg`, // Арчи Чиллов    
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCYYvf2FsWtLgF2Py42NAqNQ`, // НОРСКИЕ ДВИЖЕНИЯ
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCILhV84IVElDxKa_9mGVpTA`, // ДОРОГОЮ ДОБРА
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCSeTnvtWSsVuBJ1Ghycj4Lg`, // Бандит ТВ
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCie_eC-Gk1ap47VUyYdOVYA`, // Коляска
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCXugNh7Ec66p_iYBQPfWd9Q`, // Мопсихи NEW
    `https://youtube-api.browjob.repl.co/youtube/v3/getstreams/UCVE57NdL52xkeE9j77pnPng`, // БУ Lebed & Shaman
];

function LiveChecker() {
for (let i = 0; i < urls.length; i++) {
    fetch(urls[i])
        .then((res) => res.json())
        .then((e) => {

            if (e.liveNow === true)
                document.getElementById("LC_ChannelName").innerHTML += `<div id="d" title="${e.title}" onclick="window.open('https://ylbetter.github.io/watch?v=` + e.videoId + `')">` +
                    `<div class="info"> 
                 <div class="text">   
                <span class="channelTitle">` + e.author +
                    `</span> is now <span class="status">` +
                    e.publishedText + `</span> for ` + e.viewCount + ` viewers` + `</div> <img src="` + e.videoThumbnails[3].url + `"></div>`;
            else
                console.log("[" + i + "] " + e.author + " " + e.status + " https://www.youtube.com/channel/" + e.channelURL);

            document.getElementById("lastupdatetime").innerHTML = `Last Update: ` + new Date(new Date().getTime()).toLocaleString();
        })
        .catch((err) => {
            throw err;
        });
}
}
LiveChecker()
