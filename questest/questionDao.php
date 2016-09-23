<?php
include("db_tools.php");
class ques extends dbTools{
    public  function setQuestions($que_id,$question,$answer1,$answer2,$answer3,$answer4,$answer){
        //answer3,4若没有默认为空
        $sql = "INSERT INTO questions(que_id,question,answer1,answer2,answer3,answer4,answer) VALUES
                    ('".$que_id."','".$question."','".$answer1."','".$answer2."','".$answer3."','".$answer4."','".$answer."')";
        parent::querySql($sql);
    }

    public function  getQuestions($que_id){
        $arry_q=array();
        $sql="SELECT * FROM questions WHERE que_id='".$que_id."'";
        $result=parent::querySql($sql);

        while($row = mysqli_fetch_array($result)){
            $arry_q[] = $row;
        }
        $result=$arry_q;
        return $result;
    }
    
      public function  getAllQuestions(){
        $arry_q=array();
        $sql="SELECT * FROM questions";
        $result=parent::querySql($sql);
        while($row = mysqli_fetch_array($result)){
            $arry_q[] = $row;
        }
        $result=$arry_q;
        return $result;
    }
}
?>