<?
    function sendHtmlEmail($to, $from, $message, $subject) {
        mail($to, $subject, $message, "From: ".$from."\nContent-Type: text/html; charset=iso-8859-1");
    }

    function formatCurrency($amount) {
        return number_format($amount, 2, ",",".");
    }

    function formatCurrencyExcel($amount) {
        return number_format($amount, 2, ".",".");
    }

    function formatCurrencyEuroCenten($amounteuro, $amountcenten) {
        if ($amountcenten == 0) {
          return $amounteuro.",-";
        } else {
          $amount = $amounteuro + ($amountcenten /100);
          return number_format($amount, 2, ",",".");          	
        }
    }
    
  function ReplaceLineEnds($str) {
    return str_replace("\n", "<br/>", $str);
  }

  function Clean($string) 
  { 
    $string = stripslashes($string);
    $string = htmlentities($string);
    $string = strip_tags($string);
    return $string;
  }


  function ToHtml($string) {
    $string = htmlentities($string,ENT_NOQUOTES);
    $string = strtr($string, array_flip(get_html_translation_table(HTML_SPECIALCHARS,ENT_COMPAT)));
    $string = str_replace("€", "&euro;", $string);        
    return stripslashes($string);
  }
?>