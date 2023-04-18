const game = {score:0,gameover:true,last:0,
    holes:12,ender:25};
    makeGameBoard();
    $('.game').on('click','.mole',hitMole);
    $('#start').click(startGame);
    let time = 0;
    let timeManager;
    
    
    function hitMole(){
        $(this).hide().parent().find('.hit').show().fadeOut(200, function(){
            $(this).parent().find('.dirt').show();
        })
        game.score++;
        mes();
    }
    
    function mes(){
        let html = `<div>Score : ${game.score}</div><div>Moles Left : ${game.ender}`;
        $('.message').html(html);
    
    }
    
    // timeManager = setInterval(updateTimer, 1000);
    
    // function updateTimer() {
    // 	time++;
    // 	$('.timer').text('Timer: ' + time + ' s');
    
    // }
    
    function timing(){
        $('#start').click();
    }
    
    function starter(){
        const $ele = $('.hole'+ranHole());
        showMole($ele);
    }
    
    function showMole($ele){
    
        game.ender--;
        mes();
        if(game.ender <= 0){
            game.gameover = true;
            $('#start').show();
        }
        const timer = Math.round(Math.random()*1000)+200;
        $ele.find('.dirt').hide(0,()=>{
            $ele.find('.mole').show();
        })
        setTimeout(()=>{
            $ele.find('.dirt').show();
            $ele.find('.mole').hide();
            $ele.find('.hit').hide();
            if(!game.gameover) starter();
        },timer);
    }
    
    function ranHole(){
        const val = Math.floor(Math.random()*game.holes);
        if(val == game.last){
            return ranHole();
        }
        game.last = val;
        return val;
    }
    
    function startGame(){
        $('#start').hide();
        game.gameover = false;
        game.score = 0;
        game.ender = 25;
        starter();
    
    }
    
    function makeGameBoard(){
        for(let i=0; i<game.holes; i++){
           $div = $('<div>');
           const temp = `hole${i}`;
           $div.addClass('hole').addClass(temp).appendTo('.game');
           //la mole
           $('<div>').addClass('mole').html(`<img class='molePic' src= "/vue/mole.png">`).appendTo($div);
            //la dirt
           $('<div>').addClass('dirt').html(`<img class='holePic' src= "/vue/hole.png">`).appendTo($div);
            //le hit
            $('<div>').addClass('hit').html(`<img class='smashPic' src= "/vue/smash.png">`).appendTo($div);
        }
    }