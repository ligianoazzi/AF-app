<?php 
header('Access-Control-Allow-Origin: *');

$origins = $_GET['origins'];
$destinations = $_GET['destinations'];

$origins   = str_replace(' ', '+', $origins);
$destinations   = str_replace(' ', '+', $destinations);


$ch = curl_init();

$url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=$origins&destinations=$destinations&key=AIzaSyAKT2STlAb1eqq4vLAfrHLXfaIojBnO0RM";

curl_setopt($ch, CURLOPT_URL, $url);


// User agent
curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");

// Include header in result? (0 = yes, 1 = no)
curl_setopt($ch, CURLOPT_HEADER, 0);

// Should cURL return or print out the data? (true = return, false = print)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Timeout in seconds
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

// Download the given URL, and return output
$output = curl_exec($ch);

// Close the cURL resource, and free system resources
curl_close($ch);

echo $output;


?>