<?
	include_once "./flickr.inc.php";
	
    foreach ($setsphotos as $setphoto) 
    {
        ?>
        <div class="imgsetcontainer">
       		<img id="id<?= $setphoto['id']?>" class="flickrimg"  alt='set<?=$setphoto["setid"] ?>' src="<?=$flickr->buildPhotoURL($setphoto['photo'], "medium_640") ?>" />
			<span class="overlay"><?=$setphoto['title'] ?></span>			
		</div>
		<?
    }
?>