/*
 *
 * @author SDD
 */

(function (window){
  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;
                               
	Sakri.MathUtil = {};
	
	//used for radiansToDegrees and degreesToRadians
	Sakri.MathUtil.PI_180 = Math.PI/180;
	Sakri.MathUtil.ONE80_PI = 180/Math.PI;
	
	//precalculations for values of 90, 270 and 360 in radians
	Sakri.MathUtil.PI2 = Math.PI*2;
	Sakri.MathUtil.HALF_PI = Math.PI/2;


	//return number between 1 and 0
	Sakri.MathUtil.normalize = function(value, minimum, maximum){
		return (value - minimum) / (maximum - minimum);
	};

	//map normalized number to values
	Sakri.MathUtil.interpolate = function(normValue, minimum, maximum){
		return minimum + (maximum - minimum) * normValue;
	};

	//map a value from one set to another
	Sakri.MathUtil.map = function(value, min1, max1, min2, max2){
		return Sakri.MathUtil.interpolate( Sakri.MathUtil.normalize(value, min1, max1), min2, max2);
	};

	Sakri.MathUtil.getRandomNumberInRange = function(min, max){
		return min + Math.random() * (max - min);
	};
	
	Sakri.MathUtil.getRandomIntegerInRange = function(min, max){
		return Math.round(Sakri.MathUtil.getRandomNumberInRange(min, max));
	};

	
}(window));

(function (window){

    var Sakri = window.Sakri || {};
    window.Sakri = window.Sakri || Sakri;

  	Sakri.Geom = {};
    

    //==================================================
    //=====================::POINT::====================
    //==================================================

    Sakri.Geom.Point = function (x,y){
        this.x = isNaN(x) ? 0 : x;
        this.y = isNaN(y) ? 0 : y;
    };

    Sakri.Geom.Point.prototype.clone = function(){
        return new Sakri.Geom.Point(this.x,this.y);
    };

    Sakri.Geom.Point.prototype.update = function(x, y){
        this.x = isNaN(x) ? this.x : x;
        this.y = isNaN(y) ? this.y : y;
    };

    Sakri.Geom.Point.prototype.equals = function(point){
        return this.x==point.x && this.y==point.y;
    };

    Sakri.Geom.Point.prototype.toString = function(){
        return "{x:"+this.x+" , y:"+this.y+"}";
    };


    
	//==================================================
	//===================::RECTANGLE::==================
	//==================================================

	Sakri.Geom.Rectangle = function (x, y, width, height){
		this.update(x, y, width, height);
	};
	
	Sakri.Geom.Rectangle.prototype.update = function(x, y, width, height){
		this.x = isNaN(x) ? 0 : x;
		this.y = isNaN(y) ? 0 : y;
		this.width = isNaN(width) ? 0 : width;
		this.height = isNaN(height) ? 0 : height;
	};

  
	Sakri.Geom.Rectangle.prototype.getRight = function(){
		return this.x + this.width;
	};
	
	Sakri.Geom.Rectangle.prototype.getBottom = function(){
		return this.y + this.height;
	};

    Sakri.Geom.Rectangle.prototype.getCenterX = function(){
        return this.x + this.width/2;
    };

    Sakri.Geom.Rectangle.prototype.getCenterY = function(){
        return this.y + this.height/2;
    };

    Sakri.Geom.Rectangle.prototype.containsPoint = function(x, y){
        return x >= this.x && y >= this.y && x <= this.getRight() && y <= this.getBottom();
    };

	
	Sakri.Geom.Rectangle.prototype.clone = function(){
		return new Sakri.Geom.Rectangle(this.x, this.y, this.width, this.height);
	};
	
	Sakri.Geom.Rectangle.prototype.toString = function(){
		return "Rectangle{x:"+this.x+" , y:"+this.y+" , width:"+this.width+" , height:"+this.height+"}";
	};
	
}(window));


(function (window){

    var Sakri = window.Sakri || {};
    window.Sakri = window.Sakri || Sakri;

    Sakri.CanvasTextUtil = {};

    //returns the biggest font size that best fits into rect
    Sakri.CanvasTextUtil.getFontSizeForRect = function(string, fontProps, rect, canvas, fillStyle){
        if(!canvas){
            var canvas = document.createElement("canvas");
        }
        if(!fillStyle){
            fillStyle = "#000000";
        }
        var context = canvas.getContext('2d');
        context.font = fontProps.getFontString();
        context.textBaseline = "top";

        var copy = fontProps.clone();
        //console.log("getFontSizeForRect() 1  : ", copy.fontSize);
        context.font = copy.getFontString();
        var width = context.measureText(string).width;
        //console.log(width, rect.width);

        //SOME DISAGREEMENT WHETHER THIS SHOOULD BE WITH && or ||
        if(width < rect.width){
            while(context.measureText(string).width < rect.width || copy.fontSize*2.0 < rect.height){
                copy.fontSize++;
                context.font = copy.getFontString();
            }
        }else if(width > rect.width){
            while(context.measureText(string).width > rect.width || copy.fontSize*2.0 > rect.height){
                copy.fontSize--;
                context.font = copy.getFontString();
            }
        }
        //console.log("getFontSizeForRect() 2  : ", copy.fontSize);
        return copy.fontSize;
    }

    //=========================================================================================
    //==============::CANVAS TEXT PROPERTIES::====================================
    //========================================================

    Sakri.CanvasTextProperties = function(fontWeight, fontStyle, fontSize, fontFace){
        this.setFontWeight(fontWeight);
        this.setFontStyle(fontStyle);
        this.setFontSize(fontSize);
        this.fontFace = fontFace ? fontFace : "sans-serif";
    };

    Sakri.CanvasTextProperties.NORMAL = "normal";
    Sakri.CanvasTextProperties.BOLD = "bold";
    Sakri.CanvasTextProperties.BOLDER = "bolder";
    Sakri.CanvasTextProperties.LIGHTER = "lighter";

    Sakri.CanvasTextProperties.ITALIC = "italic";
    Sakri.CanvasTextProperties.OBLIQUE = "oblique";


    Sakri.CanvasTextProperties.prototype.setFontWeight = function(fontWeight){
        switch (fontWeight){
            case Sakri.CanvasTextProperties.NORMAL:
            case Sakri.CanvasTextProperties.BOLD:
            case Sakri.CanvasTextProperties.BOLDER:
            case Sakri.CanvasTextProperties.LIGHTER:
                this.fontWeight = fontWeight;
                break;
            default:
                this.fontWeight = Sakri.CanvasTextProperties.NORMAL;
        }
    };

    Sakri.CanvasTextProperties.prototype.setFontStyle = function(fontStyle){
        switch (fontStyle){
            case Sakri.CanvasTextProperties.NORMAL:
            case Sakri.CanvasTextProperties.ITALIC:
            case Sakri.CanvasTextProperties.OBLIQUE:
                this.fontStyle = fontStyle;
                break;
            default:
                this.fontStyle = Sakri.CanvasTextProperties.NORMAL;
        }
    };

    Sakri.CanvasTextProperties.prototype.setFontSize = function(fontSize){
        if(fontSize && fontSize.indexOf && fontSize.indexOf("px")>-1){
            var size = fontSize.split("px")[0];
            fontProperites.fontSize = isNaN(size) ? 24 : size;//24 is just an arbitrary number
            return;
        }
        this.fontSize = isNaN(fontSize) ? 24 : fontSize;//24 is just an arbitrary number
    };

    Sakri.CanvasTextProperties.prototype.clone = function(){
        return new Sakri.CanvasTextProperties(this.fontWeight, this.fontStyle, this.fontSize, this.fontFace);
    };

    Sakri.CanvasTextProperties.prototype.getFontString = function(){
        return this.fontWeight + " " + this.fontStyle + " " + this.fontSize + "px " + this.fontFace;
    };

}(window));


window.requestAnimationFrame =
        window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();
 var img=new Image();
        img.src="image/like1.jpg";
        var image=new Image();
        image.src="image/virus.png";
var readyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        if(img.complete)//图像加载完成在初始化程序，避免图片加载慢问题
        if(image.complete)
        init();//初始化
    }
}, 10);

//========================
//general properties for demo set up
//========================

var canvas;
var context;
var canvasContainer;
var htmlBounds;
var bounds;
var minimumStageWidth = 300;
var minimumStageHeight = 300;
var maxStageWidth = 980;//控制画布大小
var maxStageHeight = 1545;
var resizeTimeoutId = -1;
//var stats;

//初始化
function init(){
    $("span").hide();
    canvasContainer = document.getElementById("canvasContainer");
    window.onresize = resizeHandler;
    window.addEventListener( "keydown", keyUpEventHandler, false )
    commitResize();
}
function stopDefault(e ){  
       
    //阻止默认浏览器动作(W3C)   
    if ( e  &&  e.preventDefault ) {  
        //火狐的 事件是传进来的e  
        e.preventDefault();   
    }     
    //IE中阻止函数器默认动作的方式   
    else{  
        //ie 用的是默认的event  
        event.returnValue = false;   
    }  
    }
function getWidth( element ){return Math.max(element.scrollWidth,element.offsetWidth,element.clientWidth );}
function getHeight( element ){return Math.max(element.scrollHeight,element.offsetHeight,element.clientHeight );}

//avoid running resize scripts repeatedly if a browser window is being resized by dragging
function resizeHandler(){
    context.clearRect(0,0,canvas.width, canvas.height);
    clearTimeout(resizeTimeoutId);
    clearTimeoutsAndIntervals();
    resizeTimeoutId = setTimeout(commitResize, 300 );
}

function commitResize(){
    if(canvas){
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);

    htmlBounds = new Sakri.Geom.Rectangle(0,0, getWidth(canvasContainer) , getHeight(canvasContainer));
    if(htmlBounds.width >= maxStageWidth){
        canvas.width = maxStageWidth;
        canvas.style.left = htmlBounds.getCenterX() - (maxStageWidth/2)+"px";
    }else{
        canvas.width = htmlBounds.width;
        canvas.style.left ="0px";
    }
    if(htmlBounds.height > maxStageHeight){
        canvas.height = maxStageHeight;
        canvas.style.top = htmlBounds.getCenterY() - (maxStageHeight/2)+"px";
    }else{
        canvas.height = htmlBounds.height;
        canvas.style.top ="0px";
    }
    bounds = new Sakri.Geom.Rectangle(0,0, canvas.width, canvas.height);
    context.clearRect(0,0,canvas.width, canvas.height);
    
    
    if(bounds.width<minimumStageWidth || bounds.height<minimumStageHeight){//屏幕过小
        stageTooSmallHandler();
        return;
    }

    var textInputSpan = document.getElementById("textInputSpan");
    var textInputSpanY = (canvas.height - canvas.height*.85)/2 + 300;//15 is an estimate for half of textInputHeight问题位置
    textInputSpan.style.top = htmlBounds.getCenterY() + (bounds.height/2) - textInputSpanY +"px";
    //textInputSpan.style.left = (htmlBounds.getCenterX() - getWidth(textInputSpan)/2)+"px";
    textInputSpan.style.left = (htmlBounds.getCenterX())+"px";

    startDemo();//调用开始程序
}

function stageTooSmallHandler(){
    var warning = "Sorry, bigger screen required :(";
    context.font = "bold normal 24px sans-serif";
    context.fillText(warning, bounds.getCenterX() - context.measureText(warning).width/2, bounds.getCenterY()-12);
}




//========================
//Demo specific properties
//========================

    var HOME = 0;
    var GAME = 1;
    var GAME_OVER = 2;
    var QUESTION=5;
    var QUESTION_TRUE=6;
    var GAME_QUESTION=4;
    var gameState;
    var scrollSpeed = 3;
    var score;
    var true_answer;
    var fontProperties = new Sakri.CanvasTextProperties(Sakri.CanvasTextProperties.BOLD, null, 100);//控制logo大小

    var word = "sdd";

    function startDemo(){
        canvas.addEventListener('touchstart', handleUserTap, false);
        canvas.addEventListener('mousedown', handleUserTap, false);
        
        //canvas.addEventListener('click', handleUserTap, false);
        //var logoText = "Hero Rescue";
        if(!logoCanvas){//如果没有这个对象则创建
            logoCanvas = document.createElement("canvas");
            logoCanvasBG = document.createElement("canvas");
        }
        createLogo("Hero Rescue", logoCanvas, logoCanvasBG);
        if(!gameOverCanvas){
            gameOverCanvas = document.createElement("canvas");
            gameOverCanvasBG = document.createElement("canvas");
        }
        createLogo("Game Over", gameOverCanvas, gameOverCanvasBG);    
        createGroundPattern();
        createBird();
        createTubes();
        createCityGraphic();
        score = 0;
        gameState = HOME;
        loop();
    }

    function loop(){
        
        switch(gameState){
            case HOME:
                renderHome();
                break;
            case GAME :
                renderGame();
                break;
            case QUESTION:
                renderStop();
                break;
            case QUESTION_TRUE:
                renderGame();
                break;
            case GAME_OVER:
                // window.location.href="share.htm";
                renderGameOver();
                break;
           
        }
        //stats.tick();
    }

    function handleUserTap(event){
        switch(gameState){
            case HOME:
                gameState = GAME;
                break;
            case GAME :
                birdYSpeed = -tapBoost;
                break;
            case QUESTION_TRUE:
                birdYSpeed = -tapBoost;
                break;
           // case GAME_OVER:
            //window.location.href="share.htm";
            // window.location("bird.php");
           // context.clearRect(0, 0, canvas.width, canvas.height);
               // init();//初始化//回到HOME状态重新开始
               // break;
        }
        if(event){
            event.preventDefault();
        }
    }

    function keyUpEventHandler(event){
        //event.keyCode == 32 -> Space
        if(event.keyCode == 38){//上方向键
            handleUserTap(event);
        }
    }

    function renderHome(){
        context.clearRect(0, 0, canvas.width, canvas.height);//除了背景全部清除，在给定矩形内清空一个矩形0,0指距离左边和上边的距离
        renderGroundPattern();
        renderLogo();
        renderInstructions();
        window.requestAnimationFrame(loop, canvas);
    }

    function renderGame(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        updateTubes();
        renderTubes();//显示管道
        updateBird();
        if(!characters.length){
            gameOverHandler();
            return;
        }
        renderBird();//显示小鸟
        renderGroundPattern();
        updateScore();
        renderScore();
        window.requestAnimationFrame(loop, canvas);//实现动的效果
    }
    

   function renderStop(){
        context.clearRect(0, 0, canvas.width, canvas.height);   
        updateTubes();
        renderTubes();
        updateBird();
        if(!characters.length){
            gameOverHandler();    
            return;
        }
        renderBird();
        renderGroundPattern();
        updateScore();
        renderScore();
        
         var question_id=Math.floor(Math.random()*52+1);//1-8
     var data=JSON.parse(localStorage.getItem("question"+question_id));
     document.getElementById("question").innerHTML=data.question;
       // $("#question").innerHTML=data.question;
        document.getElementById("answer1").innerHTML="A."+data.answer1;
         document.getElementById("answer2").innerHTML="B."+data.answer2;
        //answer1.innerHTML="A."+data.answer1;
       // answer2.innerHTML = "B."+data.answer2;
        true_answer=data.answer;
        if(data.answer3!="")
             //answer3.innerHTML = "C."+data.answer3;
              document.getElementById("answer3").innerHTML="C."+data.answer3;
         else
             //answer3.innerHTML = "";  
             document.getElementById("answer3").innerHTML="";
         if(data.answer4!="")
             //answer4.innerHTML = "D."+data.answer4;
              document.getElementById("answer4").innerHTML="D."+data.answer4;
         else
             //answer4.innerHTML = ""; 
              document.getElementById("answer4").innerHTML="";   
    $("#textInputSpan").show();
    question_total++;
    }
   
    function gameOverHandler(){
    // context.clearRect(0, 0, canvas.width, canvas.height);
        gameState = GAME_OVER;
        renderGameOver();
    }
 

 function renderGameOver(){

        //game over logo
        context.clearRect(0, 0, canvas.width, canvas.height);
        // canvas.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillStyle="#7FFFD4";//白色为例子；
       // context.fillRect(0,0,canvas.width,canvas.height);
       // context.drawImage(gameOverCanvas, bounds.getCenterX() - logoCanvas.width/2, canvas.height *.2);
        var instruction = " score：";
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#FF1493";
        context.lineWidth = 3;
        context.fillText(instruction,canvas.width*.25, bounds.height*.5);//控制字显示位置高度
        context.strokeText(instruction,canvas.width*.25, bounds.height*.5);
        var question_show = "共回答题目："+question_total+" 道，其中正确："+question_right+" 道";
        context.font = "bold normal 30px sans-serif";
        context.fillStyle = "#000000";
        context.lineWidth = 3;
        context.fillText(question_show,canvas.width*.25, bounds.height*.55);//控制字显示位置高度
        document.title = '我懂健康！我得了'+score+'分，共答了'+question_total+'道题，其中答对了'+question_right+'道，你比我更了解健康吗？快来试试吧！';
        renderScorea();
        $(".replay").show();
        $(".share").show();
        $("#QRcode").show();
        var audio = $('#home')[0];
        audio.pause();
       /* var share="别忘了把我分享到朋友圈哦，和小伙伴们一起比试比试吧！";
        context.fillStyle = "#FF1493";
        context.font = "bold normal 35px sans-serif";
        context.fillText(share, canvas.width*.05, canvas.height *.2 + gameOverCanvas.height);//控制字显示位置高度
        */
    }
    
    function renderLogo(){
        logoCurrentY += logoDirection;
        context.drawImage(logoCanvas, bounds.getCenterX() - logoCanvas.width/2, logoCurrentY);
        if(logoCurrentY <= logoY || logoCurrentY >= logoMaxY){
            logoDirection *= -1;
        }
    }

    function renderInstructions(){
        var instruction = "点击开始 :)";
        context.font = "bold normal 35px sans-serif";
        context.fillStyle = "#FF1493";
        context.fillText(instruction, bounds.getCenterX() - context.measureText(instruction).width/2, canvas.height *.2);//控制字显示位置高度
    }
    function renderScorea(){
        context.font = fontProperties.getFontString();
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#000000";
        context.lineWidth = 3;
        var x = canvas.width*.65;
        var y = bounds.height*.5;
        context.fillText(score, x, y);
        context.strokeText(score, x, y);
    }
    function renderScore(){
        context.font = fontProperties.getFontString();
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#000000";
        context.lineWidth = 3;
        var x = canvas.width*.7;
        var y = bounds.height*.1;
        context.fillText(score, x, y);
        context.strokeText(score, x, y);
    }
    
    //========================================================================
    //========================:: LOGO ::======================================
    //========================================================================

    var logoCanvas;//click to start
    var logoCanvasBG;//hero rescue

    var gameOverCanvas;//answer question
    var gameOverCanvasBG;//game over

    var logoY;
    var logoCurrentY;
    var logoMaxY;
    var logoDirection;

    function createLogo(logoText, logoCanvas, logoCanvassBG){//创建logo
        logoCanvas.width = logoCanvasBG.width = canvas.width;
        logoCanvas.height = logoCanvasBG.height = canvas.height / 4;
        logoCurrentY = logoY = canvas.height * .25;
        logoMaxY = canvas.height * .35;
        logoDirection = 1;
        var logoContext = logoCanvas.getContext("2d");
        logoContext.textBaseline = "top";
        var textRect = new Sakri.Geom.Rectangle(0, 0, logoCanvas.width*.8, logoCanvas.height*.8);//控制logo大小
        var logoFontProps = fontProperties.clone();
        logoFontProps.fontSize = Sakri.CanvasTextUtil.getFontSizeForRect(logoText, fontProperties, textRect);


        var logoBGContext = logoCanvasBG.getContext("2d");
        logoBGContext.fillStyle = "#f5eea5";
        logoBGContext.fillRect(0, 0, logoCanvasBG.width, logoCanvasBG.height);
        logoBGContext.fillStyle = "#9ce358";
        logoBGContext.fillRect(0, logoFontProps.fontSize/2, logoCanvasBG.width, logoCanvasBG.height);

        logoContext.font = logoFontProps.getFontString();
        logoContext.fillStyle = logoContext.createPattern(logoCanvasBG, "repeat-x");
        logoContext.strokeStyle = "#000000";
        logoContext.lineWidth = 3;
        var x = logoCanvas.width/2 - logoContext.measureText(logoText).width/2;
        var y = logoFontProps.fontSize/2;
        logoContext.fillText(logoText, x, 0);
        logoContext.strokeText(logoText, x, 0);
    }

    //========================================================================
    //========================:: BIRD ::==================================
    //========================================================================

    var birdCanvas;
    var birdYSpeed = 0;
    var gravity = 1;
    var tapBoost = 12;//小鸟上下跳动的高度范围
    var birdSize = 80;
    var question_wrong=false;

    function updateBird(){
        characters[0].y += birdYSpeed;
        birdYSpeed += gravity;

        //floor
        if(characters[0].y >= groundGraphicRect.y - birdCanvas.height){
            characters[0].y = groundGraphicRect.y - birdCanvas.height;
            birdYSpeed = 0;
        }
        //celing
        if(characters[0].y<=0){
            characters[0].y = 1;
            birdYSpeed = 0;
        }
        //tube collision碰撞
        if(!isHit && checkTubesCollision()){
            //context.fillStyle = "#FFFFFF";
           // context.fillRect(0,0,canvas.width, canvas.height);
            //removeCharacter();
            gameState = QUESTION;
           // renderQuestion();
            isHit = true;
        }
        if(question_wrong)
        {
            removeCharacter();
        }
    }

    var currentTube;
    var isHit = false;
    var ffScoreBugFix = 0;// for some reason the score would fire multiple times on firefox

    function updateScore(){
        if(ffScoreBugFix>10 && currentTube.topRect.getRight() < characters[0].x){
            if(!isHit){
                score++;
            }
            isHit = false;
            var index = tubes.indexOf(currentTube) + 1;
            index %= tubes.length;
            currentTube = tubes[index];
            ffScoreBugFix = 0;
        }
        ffScoreBugFix++;
    }
//刷新bird
    function renderBird(){
        context.drawImage(characters[0].image, characters[0].x, characters[0].y );
        for(var i = 1; i < characters.length; i++){
             characters[i].y = characters[i-1].y - (characters[i-1].y - characters[i].y) * .9;
             context.drawImage(characters[i].image, characters[i].x, characters[i].y );
        }
    }

    function removeCharacter(){
        if(characters.length==1){
            //game over
            gameState = GAME_OVER;
        }
        for(var i=0; i<characters.length-1;i++){
            characters[i].image = characters[i+1].image;
        }
        characters.pop();
    }

    function checkTubesCollision(){
        for(var i= 0; i<tubes.length;i++){
            if(checkTubeCollision(tubes[i])){
                return true;
            }
        }
        return false;
    }


    var collisionPoint = new Sakri.Geom.Point();
    var birdPoints = [];

    function checkTubeCollision(tube){
        birdPoints[0] = characters[0].x;
        birdPoints[1] = characters[0].y;
        birdPoints[2] = characters[0].x + birdSize;
        birdPoints[3] = characters[0].y;
        birdPoints[4] = characters[0].x + birdSize;
        birdPoints[5] = characters[0].y + birdSize;
        birdPoints[6] = characters[0].x;
        birdPoints[7] = characters[0].y + birdSize;
        for(var i=0; i<8; i+=2){
            collisionPoint.x = birdPoints[i];
            collisionPoint.y = birdPoints[i+1];
            if(tube.topRect.containsPoint(collisionPoint.x, collisionPoint.y) || tube.bottomRect.containsPoint(collisionPoint.x, collisionPoint.y)){
                return true;
            }
        }
        return false;
    }

    var characters;
    var birdFontProperties = new Sakri.CanvasTextProperties(Sakri.CanvasTextProperties.BOLD, null, 50);
//创建bird
    function createBird(){

        if(!birdCanvas){
            birdCanvas = document.createElement("canvas");
        }
        birdCanvas.width = 125;//小鸟图片真实大小，决定落地时的位置
        birdCanvas.height = 155;

        characters = [];
        characters[0] = {}
        characters[0].x = canvas.width / 3;
        characters[0].y = groundGraphicRect.y/3
        characters[0].image = createCharacterImage(word.charAt(word.length - 1));

        var x = characters[0].x -(birdCanvas.width + birdCanvas.width*.2);
        for(var i=1; i<word.length ; i++){
            characters[i] = {};
            characters[i].x = x;
            characters[i].y = characters[0].y;
            x -= (birdCanvas.width + birdCanvas.width*.2);
            characters[i].image = createCharacterImage(word.charAt(word.length - i - 1));
        }
    }

    function createCharacterImage(character){
        var image = new Image();
        image.src="image/girl.png";
        //image.width = birdSize;
       // image.height = birdSize;
        //image.src = birdCanvas.toDataURL();
        return image;
    }


    //========================================================================
    //========================:: TUBES 绿色管道::=============================
    //========================================================================

    var tubeGapHeight = 300;//needs some logic
    var tubesGapWidth;
    var tubes;
    var tubeWidth = 124;//和图片宽度一致
    var minTubeHeight = 100;//needs some logic
    function updateTubes(){
        for(var i= 0; i<tubes.length;i++){
            updateTube(tubes[i]);
			//alert(i);
        }
    }

    function updateTube(tube){
        tube.topRect.x -= scrollSpeed;
        tube.bottomRect.x = tube.topRect.x;
        if(tube.topRect.x <= -tubeWidth ){
            tube.topRect.x = tube.bottomRect.x = canvas.width;
            renderTube(tube);
        }
    }


    function renderTubes(){
        for(var i= 0; i<tubes.length;i++){
            context.drawImage(tubes[i].canvas, tubes[i].bottomRect.x, 0);
        }
    }

    function createTubes(){
        tubes = [];
        var totalTubes = 2;
        tubesGapWidth = Math.floor(canvas.width/1.5);
		
        for(var i = 0; i < totalTubes; i++){
            tubes[i] = {};
            tubes[i].canvas = document.createElement("canvas");
            tubes[i].topRect = new Sakri.Geom.Rectangle(canvas.width+(i * tubesGapWidth));
            tubes[i].bottomRect = new Sakri.Geom.Rectangle(canvas.width+(i * tubesGapWidth));
            renderTube(tubes[i]);
        }
        currentTube = tubes[0];
    }

    //var tubeOutlineColor = "#534130";
    var tubeMainColor = "#75be2f";
    var tubeCapHeight = 40;

    function renderTube(tube){
        tube.canvas.width = tubeWidth;
        tube.canvas.height = groundGraphicRect.y;

        tube.bottomRect.width = tube.topRect.width = tubeWidth;
        tube.topRect.y = 0;
        tube.topRect.height = minTubeHeight + Math.round(Math.random()*(groundGraphicRect.y-tubeGapHeight-minTubeHeight*2));

        tube.bottomRect.y = tube.topRect.getBottom() + tubeGapHeight;
        tube.bottomRect.height = groundGraphicRect.y - tube.bottomRect.y - 1;//minus one for stroke

        var tubeContext = tube.canvas.getContext("2d");
        tubeContext.lineWidth = 2;
        //top tube
        renderTubeElement(tubeContext , 3, 0, tubeWidth, tube.topRect.height+tubeCapHeight);
        //bottom tube
        renderTubeElement(tubeContext , 3, tube.bottomRect.y, tubeWidth, tube.bottomRect.height+tubeCapHeight);
       }

    function renderTubeElement(ctx, x, y, width, height){ 
        ctx.fillStyle = ctx.createPattern(image,"repeat-y");
        ctx.fillRect(x, y, width, height);
    }


    //========================================================================
    //========================:: CITY BG城市背景 ::==================================
    //========================================================================

var cityGraphicCanvas;
function createCityGraphic(){

    if(cityGraphicCanvas){
        canvasContainer.removeChild(cityGraphicCanvas);
    }
    cityGraphicCanvas = document.createElement("canvas");
    cityGraphicCanvas.style.position = "absolute";
    cityGraphicCanvas.style.left = canvas.style.left;
    cityGraphicCanvas.style.top = canvas.style.top;
    cityGraphicCanvas.width = canvas.width;
    cityGraphicCanvas.height = canvas.height;

    
    var cgContext = cityGraphicCanvas.getContext("2d");
    var cityGraphicHeight = canvas.height * .25;
    //fill with blue sky
   // cgContext.fillStyle = "#e9fad8";
   
    cgContext.fillStyle = cgContext.createPattern(img,"no-repeat");
    cgContext.fillRect(0, 0, canvas.width, canvas.height);//背景
    //cgContext.fillStyle = "#e9fad8";

    cgContext.save();
    cgContext.translate(0, groundGraphicRect.y - cityGraphicHeight);

    //CLOUDS
    var maxCloudRadius = cityGraphicHeight * .4;
    var minCloudRadius = maxCloudRadius * .5;

    for(iterator=0; iterator<canvas.width; iterator+=minCloudRadius){
        cgContext.beginPath();
        cgContext.arc( iterator , maxCloudRadius, Sakri.MathUtil.getRandomNumberInRange(minCloudRadius, maxCloudRadius), 0, Sakri.MathUtil.PI2);
        cgContext.closePath();
       // cgContext.fill();
    }

    //cgContext.fillRect(0,maxCloudRadius, canvas.width, cityGraphicHeight );

    //HOUSES
    var houseWidth;
    var houseHeight;
    cgContext.fillStyle = "#deefcb";
    for(iterator=0; iterator<canvas.width; iterator+=(houseWidth+8)){
        houseWidth = 20 + Math.floor(Math.random()*30);
        houseHeight = Sakri.MathUtil.getRandomNumberInRange(cityGraphicHeight *.5 , cityGraphicHeight - maxCloudRadius *.8);
       // cgContext.fillRect(iterator, cityGraphicHeight - houseHeight, houseWidth, houseHeight);
    }

    cgContext.fillStyle = "#dff1c4";
    cgContext.strokeStyle = "#9fd5d5";
    cgContext.lineWidth = 3;
    for(iterator=0; iterator<canvas.width; iterator+=(houseWidth+8)){
        houseWidth = 20 + Math.floor(Math.random()*30);
        houseHeight = Sakri.MathUtil.getRandomNumberInRange(cityGraphicHeight *.5 , cityGraphicHeight - maxCloudRadius *.8);
        //cgContext.fillRect(iterator, cityGraphicHeight - houseHeight, houseWidth, houseHeight);
       // cgContext.strokeRect(iterator, cityGraphicHeight - houseHeight, houseWidth, houseHeight);
    }

    //TREES
    var maxTreeRadius = cityGraphicHeight * .3;
    var minTreeRadius = maxTreeRadius * .5;
    var radius;
    var strokeStartRadian = Math.PI + Math.PI/4;
    var strokeEndRadian = Math.PI + Math.PI/4;
    cgContext.fillStyle = "#81e18b";
    cgContext.strokeStyle = "#72c887";
    for(iterator=0; iterator<canvas.width; iterator+=minTreeRadius){
        cgContext.beginPath();
        radius = Sakri.MathUtil.getRandomNumberInRange(minCloudRadius, maxCloudRadius)
        cgContext.arc( iterator , cityGraphicHeight, radius, 0, Sakri.MathUtil.PI2);
        cgContext.closePath();
        //cgContext.fill();

        cgContext.beginPath();
        cgContext.arc( iterator , cityGraphicHeight, radius, strokeStartRadian, strokeEndRadian);
        cgContext.closePath();
        cgContext.stroke();
    }

    cgContext.restore();
    canvasContainer.insertBefore(cityGraphicCanvas, canvasContainer.firstChild);
   
}


    //========================================================================
    //========================:: GROUND ::==================================
    //========================================================================

    var groundX = 0;
    function renderGroundPattern(){
        context.drawImage(groundPatternCanvas, groundX, groundGraphicRect.y);
        groundX -= scrollSpeed;
        groundX %= 16;
    }


    //colors
    var groundLightGreen = "#97e556";
    var groundDarkGreen = "#73be29";
    var groundDarkerGreen = "#4b7e19";
    var groundShadow = "#d1a649";
    var groundBorder = "#4c3f48";
    //var sand = "#dcd795";
   //var sand = ground;
    var groundGraphicRect = new Sakri.Geom.Rectangle();
    var groundPatternCanvas;

    function createGroundPattern(){
        groundGraphicRect.y = canvas.height*.8;//控制地面高度,绿条位置
        if(!groundPatternCanvas){
            groundPatternCanvas = document.createElement("canvas");
        }
        groundPatternCanvas.width = 16;
        groundPatternCanvas.height = 25;
        var groundContext = groundPatternCanvas.getContext("2d");
        groundContext.fillStyle = groundLightGreen;
        groundContext.fillRect(0,0,16,16);//闪光条上亮绿色

        //diagonal graphic
        groundContext.fillStyle = groundDarkGreen;
        groundContext.beginPath();
        groundContext.moveTo(8,3);
        groundContext.lineTo(16,3);
        groundContext.lineTo(8,13);
        groundContext.lineTo(0,13);
        groundContext.closePath();
        groundContext.fill();//闪光条上的斜杠

        //top border
        groundContext.fillStyle = groundBorder;
        groundContext.globalAlpha = .2;
        groundContext.fillRect(0,0,16,1);
        groundContext.globalAlpha = 1;
        groundContext.fillRect(0,1,16,1);
        groundContext.globalAlpha = .6;
        groundContext.fillRect(0,2,16,1);

        //hilite
        groundContext.fillStyle = "#FFFFFF";
        groundContext.globalAlpha = .3;
        groundContext.fillRect(0,3,16,2);

        //bottom border
        groundContext.fillStyle = groundDarkerGreen;
        groundContext.globalAlpha = .3;
        groundContext.fillRect(0,10,16,3);
        groundContext.globalAlpha = 1;
        groundContext.fillRect(0,11,16,1);

        //shadow
        groundContext.fillStyle = groundShadow;
        groundContext.fillRect(0,13,16,3);//闪光条下边的褐色条

        var groundPattern = context.createPattern(groundPatternCanvas, "repeat-x");

        groundPatternCanvas.width = canvas.width + 16;
        groundPatternCanvas.height = 16;

        groundContext.fillStyle = groundPattern;
        groundContext.fillRect(0, 0, groundPatternCanvas.width, 16);//闪光条

    }

    function clearTimeoutsAndIntervals(){
        gameState = -1;
    }

    var maxCharacters = 8;

    function changeText(){
        var textInput = document.getElementById("textInput");
        if(textInput.value && textInput.text!=""){
            if(textInput.value.length > maxCharacters){
                alert("Sorry, there is only room for "+maxCharacters+" characters. Try a shorter name.");
                return;
            }
            if(textInput.value.indexOf(" ")>-1){
                alert("Sorry, no support for spaces right now :(");
                return;
            }
            word = textInput.value;
            clearTimeoutsAndIntervals();
            animating = false;
            setTimeout(commitResize, 100);
        }
    }
    
    //jquery
    var choose;
    var str;
    var question_total=0;
    var question_right=0;
    var question_false=0;

    $("input[name=answer]").click(function(){ 
         choose=$("input[name=answer]:checked").attr("id");
         //alert(choose);
         switch (choose){
            case "A":
                 str="answer1";
                 break;
            case "B":
                 str="answer2";
                 break;
            case "C":
                 str="answer3";
                 break;
            case "D":
                 str="answer4";
                 break;
         }
         $("#"+str).css({color:"#FF66FF"});//选中的答案变色
         switch(choose){
              case true_answer:
              showmessage("回答正确！");
              break;
              default:
              showmessage("回答错误！");
              break;
              }
              setTimeout( "showAnswer()",1000);//延时
         //showAnswer();
    });
    
    
function showAnswer(){
   
 switch(choose){
  case true_answer:
      if(gameState==QUESTION)
      {
           gameState =QUESTION_TRUE;
           $("#textInputSpan").hide();
           $("input[name=answer]:radio").attr("checked", false);
           $("#"+str).css({color:"black"});
           question_right++;
           window.requestAnimationFrame(loop, canvas);  
      }
   break;
        
  default:
   removeCharacter();
   window.requestAnimationFrame(loop, canvas);   
      $("#textInputSpan").hide();
      $("input[name=answer]:radio").attr("checked", false);
      $("#"+str).css({color:"black"});
      question_false++;
   break;
 }
}

function showmessage(text){
        $('.test').prepend('<div id="top_alert"><span>'+text+'</span></div>');           
        $('#top_alert').fadeOut(1000);
}

function replay(){
    location.reload();//重新加载
}


 var _system={
        $:function(id){return document.getElementById(id);},
   _client:function(){
      return {w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,bw:document.documentElement.clientWidth,bh:document.documentElement.clientHeight};
   },
   _scroll:function(){
      return {x:document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,y:document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop};
   },
   _cover:function(show){
      if(show){
     this.$("cover").style.display="block";
     this.$("cover").style.width=(this._client().bw>this._client().w?this._client().bw:this._client().w)+"px";
     this.$("cover").style.height=(this._client().bh>this._client().h?this._client().bh:this._client().h)+"px";
  }else{
     this.$("cover").style.display="none";
  }
   },
   _guide:function(click){
      this._cover(true);
      this.$("guide").style.display="block";
      this.$("guide").style.top=(_system._scroll().y+5)+"px";
      window.onresize=function(){_system._cover(true);_system.$("guide").style.top=(_system._scroll().y+5)+"px";};
      if(click){_system.$("cover").onclick=function(){
         _system._cover();
         _system.$("guide").style.display="none";
         _system.$("cover").onclick=null;
         window.onresize=null;
  };}
   },
   _zero:function(n){
      return n<0?0:n;
   }
}



$(document).ready(function(){

        var url = "questest/getquestion.php";
        var ajax = false;
       if(window.XMLHttpRequest) { //Mozilla 浏览器
            ajax = new XMLHttpRequest();
                if (ajax.overrideMimeType) {//设置MiME类别
                    ajax.overrideMimeType("text/xml");
                }
       }
       else if (window.ActiveXObject) { // IE浏览器
              try {
                     ajax = new ActiveXObject("Msxml2.XMLHTTP");
              } catch (e) {
                  try {
                        ajax = new ActiveXObject("Microsoft.XMLHTTP");
                  } catch (e) {}
             }
      }
      if (!ajax) { // 异常，创建对象实例失败
           window.alert("不能创建XMLHttpRequest对象实例.");
           return false;
      }
     ajax.open("POST", url, true);
     ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
     ajax.send();
     ajax.onreadystatechange = function() {
     if (ajax.readyState == 4 && ajax.status == 200) {
     //var data=JSON.parse(ajax.responseText);
     var str=ajax.responseText;
      var a = str.split('}');
     // localStorage.clear();
    // var count=data.length;
     //alert(count);
     for (i=0;i<52;i++)
     {
     a[i]=a[i]+'}';
     //alert(a[i]);
     var data=JSON.parse(a[i]);
     id=data.que_id;
    // alert(id);
     question=data.question;
     answer1=data.answer1;
     answer2=data.answer2;
     answer3=data.answer3;
     answer4=data.answer4;
     answer=data.answer;
     set_ques(id,question,answer1,answer2,answer3,answer4,answer); 
    }
    }
    }
 
});


 function set_ques(){
          var q_a={id:arguments[0],question:arguments[1],answer1:arguments[2],answer2:arguments[3],answer3:arguments[4],answer4:arguments[5],answer:arguments[6]};
          localStorage.setItem("question"+arguments[0],JSON.stringify(q_a));
          
 }
 