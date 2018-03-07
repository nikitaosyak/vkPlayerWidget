const SPEED_TIME = 5000;

function initScroller(index, scroller){
    console.log('initialized scroller')
    scroller = $(scroller);
    
    var left = 0;
    var scroll = function(){
        setTimeout(function(){
            //console.log(scroller[0].scrollWidth, scroller[0].clientWidth)
            if (left === 0){
                left = scroller[0].scrollWidth - scroller[0].clientWidth
            } else {
                left = 0;
            }

            scroller.animate({scrollLeft: left}, SPEED_TIME, 'linear', scroll);
        }, 1000)
    }

    scroll();
}

window.onload = function() {
    $('.scroller').each(initScroller);

    const songNameHTML = document.getElementById('songName')
    const artistNameHTML = document.getElementById('artistName')

    const getSong = function() {
        fetch('/get_song', {
            method: 'GET'
        }).then(function(responce) {
            if (responce.status !== 200) { console.warn('failed to get song'); return }
            responce.json().then(function(json) {
                // console.log(json)
                // songContainer.innerHTML = json.song
                if (json.song && json.song.length > 0) {
                    const args = json.song.split('–')
                    songNameHTML.innerHTML = args[1].trim()
                    artistName.innerHTML =  args[0].trim()
                } else {
                    songNameHTML.innerHTML = "NO SONG"
                    artistName.innerHTML = "NO ARTIST"
                }
                setTimeout(getSong, 10000)
            })
        }).catch(console.error)

        //setInterval(getSong, 10000)
    }
    getSong()
}
