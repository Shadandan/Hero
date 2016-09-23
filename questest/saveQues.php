<?php
include("questionDao.php");

$ob=new SaveQues();
$ob->saveQues();

class SaveQues{
    public  function  saveQues(){
        $queid=$_POST['queid'];
        $question=$_POST['question'];
        $answer1=$_POST['answer1'];
        $answer2=$_POST['answer2'];
        $answer3=$_POST['answer3'];
        $answer4=$_POST['answer4'];
        $answer=$_POST['answer'];
        $questionDao=new ques();
        $questionDao->setQuestions($queid,$question,$answer1,$answer2,$answer3,$answer4,$answer);
    }
}
?>
