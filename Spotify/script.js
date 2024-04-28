
let curentsong=new Audio();

async function getsongs(){

    let a=await fetch("http://127.0.0.1:5500/Song/");
    let response=await a.text();
    //   console.log(response);
    let div=document.createElement("div");
    div.innerHTML=response;
    let as = div.getElementsByTagName("a");
    // let aj=div.getElementsByClassName(".name");
    // console.log(as);
    let songs=[];
    // let songstitle=[];
    // for(let index = 0; index < aj.length; index++){
        // const element = aj[index];
        //console.log(element);
    // }
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
       let sg= element.href.split("/Song/")
        songs.push(sg[1]);
    }
}
return songs;
// console.log(songs) ;
}
// getsongs();
const playMusic = (track) => {
    curentsong.play();
    // play.src="pause.svg";
    // let audio = new Audio();
    // let curentsong=new Audio();
    // if(!pause){
        //     play.src="pause.svg";
        // }
        curentsong.src= "/Song/"+track;
            curentsong.play();
    document.querySelector(".s1").innerHTML = track
    document.querySelector(".starttime").innerHTML = "00:00"
    document.querySelector(".endtime").innerHTML = "00:00"
}
async function main(){
// let curentsong;
    let songs=await getsongs();
    // console.log(songs);

    let Songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        Songul.innerHTML=Songul.innerHTML + `<li>
        
        <img class="invert" src="music.svg" alt="music">
        <div class="songinfo">
        <div>${song.replaceAll("%20"," ")}</div>
        <div>Junaid Rao</div>
        </div>
        <img class="Play1" src="Play.svg" alt="Play">
    

        </li>`;
        // playMusic(song[0],true);
    }
    
    //play the first song bro
    // var audio = new Audio("http://127.0.0.1:5500/Song/" + songs[0]);

    // console.log(songs[0]);
    // audio.play();
    // audio.addEventListener("loadeddata", ()=>{
    //     let duration = audio.duration;
    //     console.log(audio.duration,audio.currentSrc,audio.currentTime);
    // });
    //Attach each song to event listener
    


    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    
        e.addEventListener("click",element=>{
        //  console.log(e.getElementsByTagName("div")[0])   
         playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML)   
            
        })
         })
         //Attach EventListner two Play Next and previous in Play Bar
         play.addEventListener("click", ()=>{
            if(curentsong.paused){
                curentsong.play();
                play.src="pause.svg";
            }
            else{
                curentsong.pause();
                play.src = "play1.svg";
            }

         })
         function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = Math.round(seconds) % 60;
        
            // Ensure leading zero if necessary
            if (remainingSeconds < 10) {
                remainingSeconds = '0' + remainingSeconds;
            }
        
            return minutes + ':' + remainingSeconds;
        }
        
        
        
        
         //Time update function
         curentsong.addEventListener("timeupdate", ()=>{
            console.log(formatTime(curentsong.currentTime),formatTime(curentsong.duration));
            document.querySelector(".starttime").innerHTML = `${formatTime(curentsong.currentTime)}`
            document.querySelector(".endtime").innerHTML = `${formatTime(curentsong.duration)}`
         document.querySelector(".circle").style.left = (curentsong.currentTime/curentsong.duration)*100 + "%";
        })
         //add event listner to seek bar
         document.querySelector(".seekbar").addEventListener("click",e=>{
         persent=(e.offsetX/e.target.getBoundingClientRect().width)*100
         document.querySelector(".circle").style.left = persent + "%";
         curentsong.currentTime = ((curentsong.duration)*persent)/100;
         })
         
         
}
main();




