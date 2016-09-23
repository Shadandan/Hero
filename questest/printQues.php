<?php
include("questionDao.php");

$ob=new SaveQues();
//$ob->saveQues();//不注释掉会打印第二次

class SaveQues{
    public  function  saveQues(){
        $queid=$_POST['question_id'];
        //$queid=7;
        $questionDao=new ques();
        $result=$questionDao->getQuestions($queid);
//        echo $result[0][0];
        $question=$result[0]['question'];
        $answer1=$result[0]['answer1'];
        $answer2=$result[0]['answer2'];
        $answer3=$result[0]['answer3'];
        $answer4=$result[0]['answer4'];
        $answer=$result[0]['answer'];

        $sing=array("question"=>$question,"answer1"=>$answer1,"answer2"=>$answer2,"answer3"=>$answer3,"answer4"=>$answer4,"answer"=>$answer);
        //$sing=array("question"=>$question);
        echo json_encode($sing);
        
        //echo $sing['answer1'];
       // echo "question";
      
    }
}
?>