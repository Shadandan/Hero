
<?php
include("questionDao.php");
$ob=new SaveQues();
//$ob->saveQues();//不注释掉会打印第二次


class SaveQues{
    public  function  saveQues(){
        $questionDao=new ques();
        $result=$questionDao->getAllQuestions();//结果是字符串数组
        $count  =  count($result);//计算数组长度，即问题数量
        for($i=0;$i<$count;$i++)
        {
            $que_id=$result[$i]['que_id'];
            $question=$result[$i]['question'];
            $answer1=$result[$i]['answer1'];
            $answer2=$result[$i]['answer2'];
            $answer3=$result[$i]['answer3'];
            $answer4=$result[$i]['answer4'];
            $answer=$result[$i]['answer'];
            $sing=array("que_id"=>$que_id,"question"=>$question,"answer1"=>$answer1,"answer2"=>$answer2,"answer3"=>$answer3,"answer4"=>$answer4,"answer"=>$answer);
            echo json_encode($sing);
        }
       return $result;
    }
}
?>