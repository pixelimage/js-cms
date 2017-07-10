<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */

//usleep(200*1000);//test

if (!defined('CMS')) exit;

$isDev = false;
if($isDev){
	ini_set( 'display_errors', 1 ); 
	error_reporting(E_ALL & ~E_NOTICE);
	header("Access-Control-Allow-Origin:*");
}else{
	error_reporting(0);
}

if (get_magic_quotes_gpc()) {
  function strip_magic_quotes_slashes($arr) {
    return is_array($arr) ?
      array_map('strip_magic_quotes_slashes', $arr) :
      stripslashes($arr);
  }
  $_GET     = strip_magic_quotes_slashes($_GET);
  $_POST    = strip_magic_quotes_slashes($_POST);
}

function status_success(){
	echo( '{"status":1 , "message":"success"}');
	exit();
}

function status_fileNotFound_weak(){
	echo( '{"status":0 ,"level":0 ,"message":"file or directory not found"}');exit();
}
function status_fileNotFound(){
	echo( '{"status":0 ,"level":1 , "message":"file or directory not found"}');exit();
}
function status_error( $s){
	echo( '{"status":0 , "level":1, "message":"'.$s.'"}');exit();
}
function status_error_dir( $s){
	echo( '{"status":0 , "level":1, "message":"dir error", "extra":"'.$s.'"}');exit();
}

function checkFileExist_weak($f){
	if(! file_exists($f)){
		status_fileNotFound_weak();
	}
}
function checkFileExist($f){
	if(! file_exists($f)){
		status_fileNotFound();
	}
}

function getVAL($_s,$_def,$_type){
	$v = $_def;
	if(isset($_GET[$_s])) $v = $_GET[$_s];
	if(isset($_POST[$_s])) $v = $_POST[$_s];
	
	if($_type == "number"){
		$v = intval($v);
	}
	if($_type == "boolean"){
		if($v == "1") $v = true;
	}
	if($_type == "path"){
		if(! is_filePath($v)) {
			status_error("invalid path");
		}
	}
	if($_type == "dir"){
		$v = str_replace("__DIR__", "../",$v);
	}
	if($_type == "path"){
		$v = str_replace("__DIR__", "../",$v);
	}
	if($_type == "paths"){
		$v = str_replace("__DIR__", "../",$v);
		$v = explode("__SEP__",$v);
	}
	if($_type == "paths2"){
		$v = str_replace("__DIR__", "../",$v);
		$v = explode(",",$v);
	}
	
	return $v;
}

function is_action($text) {
	if($text =="") return  true;
    if (preg_match("/^[a-zA-Z0-9]+$/",$text)) {
        return true;
    } else {
        return false;
    }
}
function getExtention($text) {
	$path_parts = pathinfo($text);
	return mb_strtolower($path_parts['extension']);
}
function matchExtention($text,$ar) {
	$ex = getExtention($text);
	for ($i = 0 ; $i < count($ar); $i++) {
		if($ar[$i] ==$ex )return true;
	}
	return false;
}
function is_fileName($text) {
	if($text =="") return  true;
    if (preg_match("/^[a-zA-Z0-9._¥-]+$/",$text)) {
        return true;
    } else {
        return false;
    }
}
function is_filePath($text) {
	if($text =="") return  true;
    if (preg_match("/^[\/a-zA-Z0-9._¥-]+$/",$text)) {
        if(checkPathDepth($text)) return true;
    }
	return false;
}
function checkPathDepth($text) {
	if($text{0} == "/")return false;
	$ps = explode( "/",$text );
	$c = 0;
	for ($i = 0 ; $i < count($ps); $i++) {
		if($ps[$i] == "..") $c++;
	}
	if($c > 2 )	return false;
	return true;
}

function isWritableDir($dir) {
	if(is_filePath($dir)){
		if(file_exists($dir)){
			if(is_writable($dir)){
				return true;
			} 
		}
	}
	return false;
}

function removeAllDirectory($dir) {
	if ($handle = opendir("$dir")) {
		while (false !== ($item = readdir($handle))) {
			if ($item != "." && $item != "..") {
				if (is_dir("$dir/$item")) {
					removeAllDirectory("$dir/$item");
				} else {
					unlink("$dir/$item");
				}
			}
		}
		closedir($handle);
		rmdir($dir);
	}
}

if (!function_exists('file_put_contents')) {
    function file_put_contents($filename, $data) {
        $f = @fopen($filename, 'w');
        if (!$f) {
            return false;
        } else {
            $bytes = fwrite($f, $data);
            fclose($f);
            return $bytes;
        }
    }
}

if (!function_exists('scandir')) {
    function scandir() {
        return -1;
    }
}

//backup
function isIgnoreFile($s,$list){
	$b = false;
	for ($i = 0; $i< count($list); $i++) {
		if(strpos($s,$list[$i]) !== false){ 
			$b =true;
		 }
	}
	return $b;
}

function getR($length) {
    $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
    $r_str = null;
    for ($i = 0; $i < $length; $i++) {
        $r_str .= $str[rand(0, count($str))];
    }
    return $r_str;
} 
