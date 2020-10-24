function searchResult(){
    document.getElementById('search-result').innerHTML = '';
    const song_title = document.getElementById('title_input').value;

    fetch(`https://api.lyrics.ovh/suggest/${song_title}`)
    .then(res => res.json())
    .then(data => {
        fetchdata = data;
     for(i=0; i<data.data.length; i++)
     {
         const title = data.data[i].title;
         const artist = data.data[i].artist.name;
document.getElementById('search-result').innerHTML += `
<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
if(i == 9)
{
    break;
}
 }   
  });
}

function getLyrics(index){
    const title = fetchdata.data[index].title;
    const artist = fetchdata.data[index].artist.name;

 fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`) 
 .then(res => res.json())  
 .then(data =>{
    const lyrics = data.lyrics;
    if(lyrics == undefined)
    {
        alert('Lyrics Not Found');
    }
    document.getElementById('lyrics').innerHTML = `
    <button class="btn go-back">&lsaquo;</button>
    <h2 class="text-success mb-4">${title}  By  ${artist}</h2>
    <pre class="lyric text-white"> ${lyrics} </pre>` ;
 })
}