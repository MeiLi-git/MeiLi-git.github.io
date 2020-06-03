$(function() {
    var puzzleArea = $("#puzzlearea");
    var divs = $("div", puzzleArea);
    
    var empRow = 3;
    var empCol = 3;
 
    initPuzzle(divs);
   
    $(".puzzlepiece").click(play);
    $("#shufflebutton").click(shuffle);

    function shuffle(evt){
        for(let i=0; i<50; i++) {//shuffle 50 times

            let r = parseInt(Math.random() * 4)//four directions r:[0,3]
            let p = undefined;
            if(r === 0 && empCol > 0){// has left neighbor
                p = {row: empRow, col: empCol-1};
            }
            else if(r === 1 && empRow > 0){// has top neighbor
                p = {row: empRow-1, col: empCol};
            } else if(r === 2 && empCol < 3){ //has right neighbor
                p = {row: empRow, col: empCol+1};
            } else if(r === 3 && empRow < 3){ //has bottom neighbor
                p = {row: empRow+1, col: empCol};
            }

            if(p!==undefined){
                let id = genID(p);
                let xv = p.col *100;
                let yv = p.row *100
            //    console.log($("[x=xv][y=yv]").html());
                swapCurrentWithBlank($("[x=xv][y=yv]")[0], p);
            }

                
        }
    }
    
    function play(evt){

        let p = position(this.x, this.y);
        if(isMovable(p)) {
           swapCurrentWithBlank(this, p);
        }
       
    }

    function swapCurrentWithBlank(div, p){
    
        div.style.top = empRow*100 + 'px';
        div.style.left = empCol*100 + 'px';
        div.x = empCol*100;
        div.y = empRow*100;
        empRow = p.row;
        empCol = p.col;
        resetPieces();
    }

    function resetPieces(){
        for (var i=0; i< divs.length; i++) {
            var div = divs[i];
            var x = div.x ;
            var y = div.y ;
    
            let p = position(x,y);
            if(isMovable(p)) {
                div.classList.add("movablepiece");
             }
             else{
                div.classList.remove("movablepiece");
             }
        }
    }
    function computeIndex(p){
        return p.row*4+p.col;
    }
    function isMovable(p){
        if(empRow === p.row && Math.abs(empCol-p.col) === 1)
            return true;
        else if(empCol === p.col && Math.abs(empRow-p.row) === 1)
            return true;
        else
            return false;
    }

    function position(x, y){
        let row = y/100;
        let col = x/100;
        return {row, col};
    }
    function genID(p){
        return "piece"+p.row+"_"+p.col;
    }
    //position the ith piece (i: [0, 15])
    function positionPiece(i){
            var div = divs[i];
            
            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;
    
            // set basic style and background
            let p = position(x,y);
            div.id = genID(p);
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url("./puzzle_resources/background.jpg")';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
            
            // store x and y for later
            div.x = x;
            div.y = y; 

            if(isMovable(p)) {
               div.classList.add("movablepiece");
            }
    }
    function initPuzzle(){
        for (var i=0; i< divs.length; i++) {
            positionPiece(i);
        }  
    }
    
}


);