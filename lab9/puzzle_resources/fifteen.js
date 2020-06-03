$(function() {
    var empRow = 3;
    var empCol = 3;

    var puzzleArea = $("#puzzlearea");
    var divs = $("div", puzzleArea);

    //init the puzzle
    divs.each(function(i, div){
        div = $(div);
        var x = ((i % 4) * 100) ;
        var y = (Math.floor(i / 4) * 100) ;

        // set basic style and background
        div.addClass("puzzlepiece")
            .css("left", x + 'px')
            .css("top",  y + 'px')
            .css("background-position", -x + 'px ' + (-y) + 'px')
            .attr("x", x)
            .attr("y", y);
  
        if(isMovable(div)) {
           div.addClass("movablepiece");
        }
    });
    
   
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
                let xv = p.col *100;
                let yv = p.row *100;
                let eToMove = $("[x="+xv+"][y="+yv+"]");
                swapCurrentWithBlank(eToMove);
            }                
        }
    }
    
    function play(evt){
        if(isMovable($(this))) {
           swapCurrentWithBlank($(this));
        }
    }

    function swapCurrentWithBlank(div){
  
        let p = position(div);
        div.css("left", empCol*100 + 'px')
        .css("top",  empRow*100 + 'px')
        .attr("x", empCol*100)
        .attr("y", empRow*100);
        empRow = p.row;
        empCol = p.col;
        resetPieces();
    }

    function resetPieces(){
        divs.each(function(i, div){
            div = $(div);
             if(isMovable(div)) {
                div.addClass("movablepiece");
             }
             else{
                div.removeClass("movablepiece");
             }
        });
    }
    function isMovable(div){
        let p = position(div);
        if(empRow === p.row && Math.abs(empCol-p.col) === 1)
            return true;
        else if(empCol === p.col && Math.abs(empRow-p.row) === 1)
            return true;
        else
            return false;
    }

    function position(div){
        let row = div.attr("y")/100;
        let col = div.attr("x")/100;
        return {row, col};
    }
});