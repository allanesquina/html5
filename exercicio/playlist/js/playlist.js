;(function(win, doc){
		
	//Namespace
	var lib = {};

	//Object Playlist
	lib.Playlist = {
		currentMedia : 1,
		player : {},
		songs : [],
		targetList : {},
		play : function(src) {
			this.player.pause();
			this.player.src = src;
			this.player.load();
			this.player.play();
		},	
		refreshList : function() {
			lib.Utils.createList(this.targetList, this.songs);
			this.addEvents();
		},		
		handleDragEnter : function() {
			//console.log("handleDragEnter");
		},
		handleDragLeave : function() {
			//console.log("handleDragLeave");
		},
		handleDragOver : function(e) {
			if (e.preventDefault)  {
				e.preventDefault();				
			}

		    e.dataTransfer.dropEffect = 'copy';    
		    return false;
		},
		handleDrop : function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();					
			} 

			var name = e.dataTransfer.getData("name"),
				src = e.dataTransfer.getData("src"),				
				newSong = {
					name : name,
					src	 : src
				};

			lib.Playlist.songs.push(newSong);
			lib.Playlist.refreshList();
			
			return false;
		},
		playNext : function() {
			lib.Playlist.currentMedia = (lib.Playlist.songs.length == lib.Playlist.currentMedia) ? 1 : lib.Playlist.currentMedia += 1;
			this.play(lib.Playlist.songs[(lib.Playlist.currentMedia-1)].src);
		},
		addEvents : function() {
			//Playlist
			this.targetList.addEventListener('dragenter', this.handleDragEnter, false)	
			this.targetList.addEventListener('dragleave', this.handleDragLeave, false);				
			this.targetList.addEventListener('drop', this.handleDrop, false)
			this.targetList.addEventListener('dragover', this.handleDragOver, false);		
			//Player
			this.player.addEventListener("ended",this.playNext,false);
		},
		init : function() {			
			this.player = document.getElementById("player");
			this.targetList = document.getElementById("playlist");
			this.refreshList();		
		}
	}

	//Object SongList
	lib.SongList = {
		songs : {},
		targetList : {},
		refreshList : function() {
			lib.Utils.createList(this.targetList, this.songs);		
			this.addEvents();	
		},	
		handleDragStart : function(e) {			
			e.dataTransfer.setData('name', this.innerHTML);
			e.dataTransfer.setData('src', this.name);
		},
		addEvents : function() {
			var els = document.querySelectorAll("#songlist [draggable=true]"),
				length = els.length, 
				tempEl = null;

			while(length--) {
				tempEl = els[length];
				tempEl.addEventListener('dragstart', this.handleDragStart, false);				
			}
		},
		init : function() {			
			this.targetList = document.getElementById("songlist");
			this.refreshList();
		}
	}

	//Object Utils
	lib.Utils = {
		createList : function(target, songs) {
			var length = songs.length,
				markup = "";

			while(length--) {
				markup += "<li><a name='" + songs[length].src + "' draggable='true' onclick=LibAudio.Playlist.play('" + songs[length].src + "') href='javascript:void(0);'>" + songs[length].name + "</a></li>";
			}
			
			target.innerHTML = markup;
		}
	}

	win.LibAudio = lib;

})(window, document);

window.onload = function() {
	//Some Examples of songs
	LibAudio.SongList.songs = [
		{
			name : "Musica01",
			src	 : "http://v2v.cc/~j/theora_testsuite/320x240.ogg"
		},
		{
			name : "Musica02",
			src	 : "http://v2v.cc/~j/theora_testsuite/320x240.ogg"
		},
		{
			name : "Musica03",
			src	 : "http://v2v.cc/~j/theora_testsuite/320x240.ogg"
		},
		{
			name : "Musica04",
			src	 : "http://v2v.cc/~j/theora_testsuite/320x240.ogg"
		}
	];
	//Initialize Libs
	LibAudio.Playlist.init();
	LibAudio.SongList.init();		
}
