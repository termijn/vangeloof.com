<?
 error_reporting(E_ALL);
  ini_set('display_errors', '1');
	include_once "./phpflickr/phpFlickr.php";
	
	if (session_id() == "") 
	{
		@session_start();
	}
	
	if (!isset($_SESSION["flickr"])) 
	{
		$flickr = new phpFlickr("38645fd437628da4df184582e9b76143", "e6a8d80411b24b0e");
		$flickr->enableCache("db", "mysql://m1_4890ced1:gRyAwWTcnG@db2.hosting2go.nl/m1_4890ced1");
		$flickr->setToken("72157629847522041-50c5898e70acfd7d");
		$_SESSION["flickr"] = &$flickr;
		$flickrperson = $flickr->people_findByUsername("Martijn van Geloof");
		$_SESSION["flickrperson"] = $flickrperson;
	} 
	else 
	{
		$flickr = &$_SESSION["flickr"];
		$flickrperson = &$_SESSION["flickrperson"];
	}
?>