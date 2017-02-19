<?php

namespace SocialStreams\JsonAPI;


class Utils
{

	static private $calls = array();

	static public function call( $type, $request, $body = null )
	{

		/**
		 * Normalize variables
		 */
		$request = static::normalizeRequest( $request );
		$type = static::getRequestTypeFromBody( $type, $body );

		/**
		 * Make api call
		 */
		$output = Bootstrap::$bw_api->call( $type, $request, $body, ARRAY_A );



		/**
		 * enque script to print in the footer.
		 */
		if ( empty(static::$calls) )
		{
			if ( is_admin() )
			{
				add_action( 'admin_footer', array(get_called_class(), 'outputCallsScripts') );
			}
			else
			{
				add_action( 'wp_footer', array(get_called_class(), 'outputCallsScripts') );
			}
		}


		// add call to call stack
		// !! this is a big array, use with caution.. !!
		static::$calls[] = array(
			'type' => $type,
			'request' => $request,
			'body' => $body,
			'output' => $output
		);


		return $output;

	}/* call() */

	/**
	 * Strip requst string to minimum necessary "version/site/table/item/connection"
	 *
	 * @author Alessandro Biavati <@alebiavati>
	 * @package Utils.php
	 * @since 1.0
	 * @param (string) $request
	 * @return (string) $request
	 */

	static public function normalizeRequest( $request )
	{

		$request_n = $request;

		// 0) strip spaces
		$request_n = trim( $request_n );

		// 1) remove host url
		$host = $_SERVER['HTTP_HOST'];
		if ( strrpos($request_n, $host) === 0)
			$request_n = substr($request_n, strlen($host) );

		// 2) remove /api/ (apiFront)
		$apiRoot = '/' . Bootstrap::$bw_api->getApiFront() . '/';
		if ( strrpos($request_n, $apiRoot) === 0 )
			$request_n = substr($request_n, strlen($apiRoot) );

		// 3) strip slashes
		$request_n = trim( $request_n, '/');

		return $request_n;

	}/* normalizeRequest() */



	/**
	 * Check if body has the _method attribute to
	 * override the request type
	 *
	 * @author  <>
	 * @package BWAPI.php
	 * @since 1.0
	 * @param $type
	 * @param $body
	 * @return $type
	 */

	static public function getRequestTypeFromBody( $type, $body )
	{
		$type = strtolower($type);

		if ( $type == 'post' ) {

			if ( is_array($body) && isset($body['_method']) ) {
				$type = strtolower($body['_method']);
			}

		}

		return $type;

	}/* getRequestTypeFromBody() */



	static public function outputCallsScripts()
	{

		foreach (static::$calls as $call){

			$bodyQuery = '';
			$requestID = '';
			$body = array();

			if ( isset( $call['body']) && is_array( $call['body'] ) && !empty($call['body'] ) ){

				$body = $call['body'];
				$bodyQuery = http_build_query( $body );

			}


			if ( isset( $body['request_id']) && !empty( $body['request_id'] ) ){

				$requestID = $body['request_id'];

				unset($body['request_id']);

			}


			echo '<script type="application/json" class="bwapi-call-data" data-id="' . $requestID . '" data-type="' . $call['type'] . '" data-request="' . $call['request'] . '" data-body="' . $bodyQuery . '">' . json_encode( $call['output'] ) . '</script>' . "\n";

		}

	}


	static public function get( $request, $body = NULL )
	{

		if( !$body || is_null( $body ) )
			$body = $_GET;

		return static::call('get', $request, $body );

	}/* get() */

	static public function post( $request, $body = array() )
	{
		return static::call('post', $request, $body );

	}/* post() */

	static public function put( $request, $body = array() )
	{
		return static::call('put', $request, $body );

	}/* put() */

	static public function delete( $request, $body = array() )
	{
		return static::call('DELETE', $request, $body );

	}/* delete() */


	static public function output( $output, $type = false )
	{
		Bootstrap::$bw_api->output( $output, $type );
	}
}
