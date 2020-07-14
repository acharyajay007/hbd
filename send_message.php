<?php 
header("content:application/json");
include('class.phpmailer.php');
$message=isset($_REQUEST['inputmessage'])?$_REQUEST['inputmessage']:"";
if($message!="")
{
	$from_name = 'Veds';
	$from_mail = "info@craftbox.in";
	//$mail = new PHPMailer();
	$mailer = new PHPMailer();
	$mailer->SetFrom($from_mail,$from_name); // From email ID and from name
	$mailer->AddAddress("acharyajay007@gmail.com");
	$mailer->AddAddress("acharyajay001@gmail.com");
	$mailer->Subject = "Review from veds!!";
	$mailer->MsgHTML($message);
	$mailer->Send();
	$respose=array("type"=>true,"msg"=>"Yupp got your message!!");
}	
else
{
	$respose=array("type"=>false,"msg"=>"Atleast write two words yaar please!!");
}
echo json_encode($respose);
?>