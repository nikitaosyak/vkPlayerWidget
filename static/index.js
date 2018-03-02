
window.onload = function() {
    const songNameHTML = document.getElementById('songName')
    const artistNameHTML = document.getElementById('artistName')

    const getSong = function() {
        fetch('/get_song', {
            method: 'GET'
        }).then(function(responce) {
            if (responce.status !== 200) { console.warn('failed to get song'); return }
            responce.json().then(function(json) {
                console.log(json)
                // songContainer.innerHTML = json.song
                const args = json.song.split('–')
                songNameHTML.innerHTML = args[1].trim()
                artistName.innerHTML =  'by ' + args[0].trim()
                setTimeout(getSong, 2000)
            })
        }).catch(console.error)
    }
    getSong()
}