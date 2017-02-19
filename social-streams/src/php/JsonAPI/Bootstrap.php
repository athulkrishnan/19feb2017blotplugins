<?php

  namespace SocialStreams\JsonAPI;

  class Bootstrap
  {

    /**
     * Store a 'loaded' flag, in case we are generating this class more than once.
     */
    static private $loaded = false;

    /**
     * @var (string) Plugin path
     */
    static public $path;

    /**
    * @var (string) Plugin version
    */
    static public $version;

    /**
    * @var (object) BW API instance
    */
    static public $bw_api;


    /**
     * Bootstrap App
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 0.0.0
     */

    public function __construct( $path, $version )
    {

      // check if we already loaded the app before.
      if ( static::$loaded )
        return;

      // set loaded flag to true so we don't load the app twice
      static::$loaded = true;

      // set plugin path and version passed to the constructor
      static::$path = $path;
      static::$version = $version;

      // Instantiate app classes
      new Auth();
      new Log();
      static::$bw_api = new BWAPI();

    } /* __construct() */

  }/* class Bootstrap */
