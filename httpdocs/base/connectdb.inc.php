<?php

        $db = mysql_pconnect("localhost", "gooik759", "uc36yy")
            or die("Kan geen verbinding maken met de stepshop database");

        mysql_select_db("stepshop01", $db)
            or die("Kan geen database selecteren");
    
?>