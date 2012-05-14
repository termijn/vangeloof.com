<?
 
	include_once "./phpflickr/phpFlickr.php";
	session_start();	

	
	if (!isset($_SESSION["flickr"])) 
	{
		$flickr = new phpFlickr("38645fd437628da4df184582e9b76143", "e6a8d80411b24b0e");
		$flickr->enableCache("db", "mysql://m1_4890ced1:gRyAwWTcnG@db2.hosting2go.nl/m1_4890ced1");
		$flickr->setToken("72157629847522041-50c5898e70acfd7d");
		$_SESSION["flickr"] = &$flickr;
		$flickrperson = $flickr->people_findByUsername("Martijn van Geloof");
		$_SESSION["flickrperson"] = &$flickrperson;
		$setsList = $flickr->photosets_getList($flickrperson['id']);
		
		$setsphotos = array();
		foreach ((array)$setsList['photoset'] as $photoset)
	    {
	    	$i++;
	    	
			$setphotos = $flickr->photosets_getPhotos($photoset["id"], NULL, NULL, 1);
			
			foreach((array)$setphotos['photoset']['photo']  as $photo)
			{
				$setphoto = array();
				$setphoto['title'] = $photoset['title'];
				$setphoto['setid'] = $photoset["id"];
				$setphoto['photo'] = $photo;
				$setphoto['id'] = $photo['id'];
				array_push($setsphotos, $setphoto);	
			}
		}
		$_SESSION["setsphotos"] = &$setsphotos;
	} 
	else 
	{
		$flickr = &$_SESSION["flickr"];
		$flickrperson = &$_SESSION["flickrperson"];
		$sets = &$_SESSION["sets"];
		$setsphotos = &$_SESSION["setsphotos"];
	}
	
	if (isset($_GET['setid']))
	{
		$setid = $_GET['setid'];
		$setphotos = &$flickr->photosets_getPhotos($setid, NULL, NULL);
	}

?>