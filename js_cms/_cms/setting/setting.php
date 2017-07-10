<?php
/*
	JS CMS ログイン情報設定 
	
	ログイン情報は、必ず変更してください。
	設定を変更した場合は、保存したあと、ブラウザをリロードしてください。
	設定できるアカウントは1つだけです。

*/
 
if (!defined('CMS')) exit;

//■ユーザー認証を利用するか 
define( 'USE_LOGIN', true);//利用する
//define( 'USE_LOGIN', false);//利用しない

//■ユーザー名を設定してください
define( 'USERNAME', 'guest');

//■パスワードを設定してください
define( 'PASSWORD', 'guest');

//■デモモード (デモでは、保存処理を禁止します)
//define('IS_DEMO', true);//デモモード
define('IS_DEMO', false);//通常モード
