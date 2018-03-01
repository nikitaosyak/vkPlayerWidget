
window.onload = function() {
    console.log('preved')
    const songContainer = document.getElementById('songContainer')
    songContainer.innerHTML = 'akakak'

    const getSong = function() {
        fetch('/get_song', {
            method: 'GET'
        }).then(function(responce) {
            if (responce.status !== 200) { console.warn('failed to get song'); return }
            responce.json().then(function(json) {
                console.log(json)
                songContainer.innerHTML = json.song
                setTimeout(getSong, 2000)
            })
        }).catch(console.error)
    }
    getSong()
}