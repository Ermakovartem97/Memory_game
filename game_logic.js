var memory_array = ['0C','0D','0H','0S','2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H','4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C','8D','8H','8S','9C','9D','9H','9S','JC','JD','JH','JS','QC','QD','QH','QS','KC','KD','KH','KS','AC','AD','AH','AS'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var score = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

function map(arr) {
    var napp = [];
        for (var i = 0; i<arr.length/6; i++){
            napp.push(arr[i]);
        }
            return napp;
}

function clear_cards(a) {
	document.getElementById(a[0]).style.background = 'transparent';
	document.getElementById(a[0]).onclick = "";
	document.getElementById(a[0]).style.cursor = 'default';
	document.getElementById(a[1]).style.background = 'transparent';
	document.getElementById(a[1]).onclick = '';
	document.getElementById(a[1]).style.cursor = 'default';
}





function newBoard(){
	tiles_flipped = 0;
	var output = '';
	var output2 = '';
	memory_array.memory_tile_shuffle();
	var arr = map(memory_array);
	var Cards =arr.concat(arr);
	Cards.memory_tile_shuffle();
	for(var i = 0; i < 18; i++){
		output += '<div data-tid="Card-flipped" style="background: url(images/cards/'+Cards[i]+'.png) no-repeat;background-size: 100%;"></div>';
		output2 += '<div data-tid="Card" id="tile_'+i+'" onclick="memoryFlipTile(this,\''+Cards[i]+'\')"></div>';
	}

	document.getElementById('memory_board').innerHTML = output;

    function stop_look() {
		document.getElementById('memory_board').innerHTML = output2;
    }
    setTimeout(stop_look,3500);
}

function memoryFlipTile(tile,val){
	if(memory_values.length < 2){
		tile.style.backgroundImage = 'url(images/cards/'+ val +'.png)' ;
		tile.dataset.tid = "Card-flipped";
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);

			if(memory_values[0] == memory_values[1]){
				function clear2Back() {
					tiles_flipped += 2;
					score += (18 - tiles_flipped) * 42;
					var Score_line = '<td align="right">Очки: '+ score +'</td>';
					document.getElementById('score').innerHTML = Score_line;
					clear_cards(memory_tile_ids);
					memory_values = [];
					memory_tile_ids = [];

					if(tiles_flipped == 18){
						localStorage.setItem("par",score);
						document.location.href = "score.html";
					}
				}
				setTimeout(clear2Back, 600);
			} else {
				function flip2Back(){
					score -= tiles_flipped * 42;
					var Score_line = '<td align="right">Очки: '+ score +'</td>';
					document.getElementById('score').innerHTML = Score_line;
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.backgroundImage = 'url(images/cards/back.png)';
				    tile_1.dataset.tid = "Card";
				    tile_2.style.backgroundImage = 'url(images/cards/back.png)';
				    tile_2.dataset.tid = "Card";
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 600);
			}
		}
	}
}