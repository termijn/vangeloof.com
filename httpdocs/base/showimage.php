<?php

    $image = $_GET['image'];
    $maxsize = $_GET['maxsize'];

    if ($image == NULL OR $maxsize == NULL) { die("You have to give more parameters!"); }
    $im = imagecreatefromjpeg ($image);
    if (!$im) {
     die ("kan image niet vinden");
    }
    header("Content-type: image/jpeg");
    $size = getimagesize ($image);
    $width = $size[0];
    $height = $size[1];

    if ($width > $maxsize || $height > $maxsize)
    {
        if ($width > $height)
        {
            $factor = $maxsize / $width;
        }
        else
        {
            $factor = $maxsize / $height;
        }
        $width = $width * $factor;
        $height = $height * $factor;
        // Kan gebruikt worden vanaf GD versie 2.0
        $plaatje = imagecreatetruecolor ($width, $height);
        //$plaatje = imagecreate ($width, $height);
        imagecopyresampled ( $plaatje, $im, 0, 0, 0,0, $width, $height, $size[0], $size[1]);
        //imagecopyresized ( $plaatje, $im, 0, 0, 0,0, $width, $height, $size[0], $size[1]);
        $im = $plaatje;
    }
    imagejpeg($im);
    imagedestroy($im);

?>
