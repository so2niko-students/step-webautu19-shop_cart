<?php

function start(){
    $type = $_GET['type'];
    $answ = 'ERROR, illegal type of request';

    switch($type){
        case 'order' : {
            $answ = order();
            break;
        }
        case 'products' : {
            $answ = products();
            break;
        }
        case 'categories' : {
            $answ = categories();
            break;
        }
    }

    echo $answ;
}

function order(){
    $email = $_GET['email'];
    $tel = $_GET['tel'];
    $name = $_GET['name'];
    $products = $_GET['products'];
    $productsArr = json_decode($products);
    $time = time();
    $text = "$time --- $email --- $tel --- $name --- $products \n";
    
    $products_body = '';
    foreach($productsArr as $prod){
        $products_body .= "____________%0A";

        foreach($prod as $prop => $val){
            $products_body .= "*$prop*:%20$val%0A";
        }
    }

    
    file_put_contents('sendInfo.txt', $text, FILE_APPEND);
    
    sendToBot($email, $tel, $name, $products_body);

    return 'ok';
}


function sendToBot($email, $tel, $name, $products_body){
    $chatId = '-353593305';
    $botAPIKey = '1362251820:AAHlMA0ngWHlz123TRJlTfmkBiZVVetf-h0';
    $url = "https://api.telegram.org/bot$botAPIKey/sendMessage?chat_id=$chatId&parse_mode=MarkdownV2&text=*email*:%20$email;%0A*name*:%20$name;%0A*tel*:%20$tel;%0A*products*:%0A$products_body";
    
    fopen($url, 'r');
}

function products(){
    // return dataFromCSV('./data/products_shop.csv');
    return dataFromTSV('./data/stuff.tsv');
}

function categories(){
    // return dataFromCSV('./data/categories.csv', false);
    return dataFromTSV('./data/stuff_categories.tsv');
}


function dataFromTSV($filename){
    $fileText = file_get_contents($filename);
    $linesArr = explode("\n", $fileText);
    $names = explode("\t", array_shift($linesArr));

    foreach($names as $i => $el){
        $names[$i] = trim($names[$i]);
    }

    $productsResult = [];

    foreach($linesArr as $line){
        $prodLine = explode("\t", $line);//разбиение строки делителем на массив
        
        $product = [];
    
        foreach($prodLine as $i => $el){
            $product[$names[$i]] = trim($el);
        }

        if(isset($product['price'])){
            $pr = $product['price'];
            $product['price_view'] = $pr;
            $pr2 = str_replace(" ", "", $pr);
            $product['price'] = str_replace(",", ".", $pr2);
        }

        array_push($productsResult, $product);
    }

    $str = json_encode($productsResult);
    return $str;
}

function dataFromCSV($filename, $isWind1251 = true){
    $fileText = file_get_contents($filename);
    
    if($isWind1251){
        $fileText = iconv('windows-1251', 'utf-8', $fileText);//Перекодировка для русского языка
    }
    
    $linesArr = explode(";;;;;", $fileText);
    $names = explode(';', array_shift($linesArr));

    $productsResult = [];

    foreach($linesArr as $line){
        $prodLine = explode(';', $line);//разбиение строки делителем на массив

        if(count($prodLine) > 1){
            $product = [];
        
            foreach($prodLine as $i => $el){
                $product[$names[$i]] = trim($el);
            }
        
            array_push($productsResult, $product);
        }
        
    }
    $str = json_encode($productsResult);
    return $str;
}

start();