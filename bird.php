
<!DOCTYPE html>
<html>

<head>

  <title>英雄救美</title>

    <link rel="stylesheet" href="bird.css" media="screen" type="text/css" />
<script src="jquery-1.11.3.min.js"></script>
<script src="js/jqfloat.min.js"></script>
<script type="text/javascript" src="js/jquery.leanModal.min.js"></script>
 <link rel="stylesheet" type="text/css" media="all" href="css/style_leanmodel.css"/> 
 <style type="text/css">
 #loginmodal1 {
    padding:80px 20px;
    background: rgba(255,255,255,0.7);
    -webkit-border-top-left-radius:500px 450px;
    -webkit-border-top-right-radius:500px 450px;
    -webkit-border-bottom-right-radius:500px 450px;
    -webkit-border-bottom-left-radius:500px 450px;
    -moz-border-radius:500px / 450px;
    border-radius:500px / 450px; 
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);   
    width: 900px; 
    z-index: 11000;
    left: 23%; 
    margin-left: -202px; 
    opacity: 1;
    position: absolute; 
    top: 200px; 
    }
 body{font-size: 12px;}
 #OpenWindow-header {
    color: #CD00CD;
    padding:0px 0px 0px 100px;
    }

 #text{
    padding:0px 35px 25px 50px;
    
 }
.test p{width:0; height:0; font-size:0; background:#beceeb; overflow:hidden; position: absolute;}
.test p.top{
    width:120px;
    height:120px;
    -moz-border-radius:65px;
    -webkit-border-radius:65px;
    border-radius:65px;
    left:15px;
    bottom:-40px;
    background:rgba(255,255,255,0.7) ;
}
.test p.bot{
    width:50px;
    height:50px;
    -moz-border-radius:30px;
    -webkit-border-radius:30px;
    border-radius:30px;
    background:rgba(255,255,255,0.7) ;
    left:0px;
    bottom:-90px;
}

#mess_share{margin:15px 0;}
#share_1{float:left;width:49%;}
#share_2{float:right;width:49%;}
#mess_share img{width:22px;height:22px;}
#cover{display:none;position:absolute;left:0;top:0;z-index:18888;background-color:#000000;opacity:0.7;}
#guide{display:none;position:absolute;right:18px;top:5px;z-index:19999;}
#guide img{width:260px;height:180px;}


 #top_alert{
        width:350px;
        font-size: 50px;
        padding:5px 5px;
        border:2px solid #f8efb0;
        color:red;
        position:absolute;
        text-align:center;
        left:35%;
        top:50%;
        }
        
 </style>
</head>

<body>
<audio id="home" src="sound/Crazy Baby.mp3" autoplay="autoplay" loop="loop" hidden="true"  ></audio>
<audio id="game" src="sound/menu.mp3" controls="controls" loop="false" hidden="true"  ></audio>
<audio id="stop" src="sound/menu.mp3" controls="controls" loop="false" hidden="true"  ></audio>
<audio id="right" src="sound/menu.mp3" controls="controls" loop="false" hidden="true"  ></audio>
<audio id="wrong" src="sound/menu.mp3" controls="controls" loop="false" hidden="true"  ></audio>
<audio id="gameover" src="sound/menu.mp3" controls="controls" loop="false" hidden="true"  ></audio>
  <div id="canvasContainer"></div>

<span id="textInputSpan" >
<h1>
     <form>
         <div id="loginmodal1" class="test"> 
         <div id="text">
              <div id="OpenWindow-header">
                <h1>正确回答健康小知识继续游戏</h1>   
              </div>
               <h1>
               <a id="question"></a>
           <br />
            <br />
            <label for="A"><input type="radio"  name="answer" id="A" /><a id="answer1"></a></label>
            <br />
            <br />
            <label for="B"><input type="radio" name="answer" id="B"/><a id="answer2"></a></label>
            <br />
            <br />
            <label for="C"><input type="radio" name="answer" id="C"/><a id="answer3"></a></label>
            <br />
            <br />
            <label for="D"><input type="radio" name="answer" id="D"/><a id="answer4"></a></label>
            <br />
            <br />
            </h1>
            <p class="bot"></p>
            <p class="top"></p>
        </div>
        </div>
     </form>
     </h1>
</span>
<!--input type="button" class="start" value="点击开始" onclick="();" /-->

 <input type="button" class="replay" value="再来一次" onclick="replay();" />
 <input type="button" class="share" value="分享给朋友" onclick="_system._guide(true);" />
  <div id="cover"></div>
<div id="guide"><img src="image/guide1.png"/></div>

  <div>
  <img id="QRcode" src="image/QRcode2.png"/> 
  </div>
  <div class="main"></div>
  
  <script src="bird.js"></script>

</body>

</html>