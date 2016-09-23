<?php
//if( $_POST["ques"] || $_POST["ans1"] || $_POST["ans2"] || $_POST["ans3"] || $_POST["ans4"] )
//{
//    $question=$_POST['ques'];
//    $answer1=$_POST['ans1'];
//    $answer2=$_POST['ans2'];
//    $answer3=$_POST['ans3'];
//    $answer4=$_POST['ans4'];

//    exit();
//}
//?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <script src="jquery-1.11.3.min.js" type="text/javascript"></script>
</head>
<body>
<div>
<center>
<!--    <form method="post" action="--><?php //echo $_SERVER['PHP_SELF'];?><!--">-->
    <input type="text" id="queid" name="queid">  id<br>
    <input type="text" id="ques1" name="ques">   question<br>
    <input type="text" id="ans11" name="ans1">   answer1<br>
    <input type="text" id="ans22" name="ans2">   answer2<br>
    <input type="text" id="ans33" name="ans3">   answer3<br>
    <input type="text" id="ans44" name="ans4">   answer4<br>
    <input type="text" id="ans55" name="ans5">   answer<br>
    <input type="button" style="height:30px;width:60px;position: relative" id="btn" value="save">
<!--    </form>-->
    <input type="button" style="height:30px;width:60px;position: relative" id="btn1" value="print">
</center>
</div>
    <script type="text/javascript">

        var id=1;
        var question="what's your sex?";
        var answer1="male";
        var answer2="female";
        var answer3="female";
        var answer4="female";
        var flag=4;


            $("#btn").click(function(){
                id=$("#queid").val();
                question=$("#ques1").val();
                answer1=$("#ans11").val();
                answer2=$("#ans22").val();
                answer3=$("#ans33").val();
                answer4=$("#ans44").val();
                answer=$("#ans55").val();
//                alert(id+question+answer1+answer2);
                $.post(
                    "saveQues.php",
                    {
                        queid:id,
                        question:question,
                        answer1:answer1,
                        answer2:answer2,
                        answer3:answer3,
                        answer4:answer4,
                        answer:answer
                    }
                );
////                localStorage.clear();
////                var da=$("#ques").val();
////                alert(da);
//                set_ques(id,question,answer1,answer2,answer3,answer4);
            });


            $("#btn1").click(function(){
                $.post(
                    "printQues.php",
                    function(result){
                    question=result.question;
                    answer1=result.answer1;
                    answer2=result.answer2;
                    answer3=result.answer3;
                    answer4=result.answer4;
                    answer=result.answer;
                    $("#ques1").attr("value",question);
                    $("#ans11").attr("value",answer1);
                    $("#ans22").attr("value",answer2);
                    $("#ans33").attr("value",answer3);
                    $("#ans44").attr("value",answer4);
                    $("#ans55").attr("value",answer);
                    //alert(question+answer1+answer2+answer3+answer4+answer);
                }
                );
            });




            function set_ques(){
                if(arguments[1]!=null&&arguments[2]!=null&&arguments[3]!=null){
                    if(arguments.length==4){
                        var q_a={id:arguments[0],question:arguments[1],answer1:arguments[2],answer2:arguments[3]};
                        localStorage.setItem("question"+arguments[0],JSON.stringify(q_a));
                    }
                    else if(arguments.length==5){
                        var q_a={id:arguments[0],question:arguments[1],answer1:arguments[2],answer2:arguments[3],answer3:arguments[4]};
                        localStorage.setItem("question"+arguments[0],JSON.stringify(q_a));
                        flag=5;
                    }
                    else if(arguments.length==6){
                        var q_a={id:arguments[0],question:arguments[1],answer1:arguments[2],answer2:arguments[3],answer3:arguments[4],answer4:arguments[5]};
                        localStorage.setItem("question"+arguments[0],JSON.stringify(q_a));
                        flag=6;
                    }
                }

            }
            function get_ques(){
                var data=JSON.parse(localStorage.getItem('question0'));
                if(flag==4){
                    alert(data.id+"  "+data.question+"   "+data.answer1+"   "+data.answer2);
                }
                else if(flag==5){
                    alert(data.id+"  "+data.question+"   "+data.answer1+"   "+data.answer2+"  "+data.answer3);
                }
                else if(flag==6){
                    alert(data.id+"  "+data.question+"   "+data.answer1+"   "+data.answer2+"  "+data.answer3+"    "+data.answer4);
                }
            }
        function isString(str){
            return (typeof str=='string')&&str.constructor==String;
        }

    </script>
</body>
</html>

