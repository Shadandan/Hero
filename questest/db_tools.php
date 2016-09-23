<?php
define("DB_URL", "127.0.0.1");//mysql.500yun.com
define("DB_USER", "root");//u874622638_ws
define("DB_PWD", "123321");
define("DB_NAME", "test");//u874622638_ws
class dbTools{
	
	function querySql($sql){
		$con = self::openDB();
		$result = mysqli_query($con,$sql);
		mysqli_close($con);
		return $result;
	}
	
	function openDB(){
		$con = mysqli_connect(DB_URL,DB_USER,DB_PWD,DB_NAME);
		//if (!$con){
		//  die('Could not connect: ' . mysql_error());
		//}else{
		//}
		//mysql_select_db(DB_NAME, $con);
		return $con;
	}
}
?> 