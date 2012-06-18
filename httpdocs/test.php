<?php 

error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();

if (!isset($_SESSION['naam']))
{
$_SESSION['naam']='William';
}
else
{
$_SESSION['naam']='William van Geloof';
}
?>


	<?php echo session_id()." ".$_SESSION['naam']; ?>
	<br>
	<?php echo "<a href=\"./news.php?".SID."\">news</a>"; ?>
