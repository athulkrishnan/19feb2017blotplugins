<?php

	namespace SocialStreams;

	class BWPostType
	{

		/**
		 * Register Custom Post Type with custom table
		 */
		function __construct( $args )
		{

			// assign arguments to object
			foreach( $args as $key => $value )
			{
				$this->set( $key, $value );
			}

			// check if we need to update the database
			$this->dbUpdateCheck();

		}/* __construct() */


		/**
		 * Get generic object attribute
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @param (string) $key - value key to return
		 * @return (mixed) attribute value
		 */

		public function get( $key )
		{
			if( isset( $this->{ $key } ) )
				return $this->{ $key };

		}/* get() */

		/**
		 * Set generic object attribute
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @param (string) $key - key to set
		 * @param (string) $value - value to set
		 * @return null
		 */

		public function set( $key, $value )
		{
			$this->{ $key } = $value;

		}/* set() */


		/**
		 * Setup custom table
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @return null
		 */
		public function dbUpdateCheck()
		{

			$dbVersion = get_option( $this->optionName );

			if( empty( $dbVersion ) )
				$dbVersion = '0';

			if( $dbVersion == $this->version )
				return;

			global $wpdb;

			$postTypeTableName = $wpdb->prefix . $this->tableName;
			$postTypeMetaTableName = $wpdb->prefix . $this->metaTableName;

			// set update options
			$opts = array(
				'upgrade_method' => 'dbDelta',
				'table_options' => '',
				// 'upgrade_method' => 'delete_first',
			);

			$postTypeTableColumns = "";

			$postTypeTableColumnsPrimaryKey = "";
			$postTypeTableColumnsKeys = "";

			if( !empty( $this->fields ) )
			{
				foreach( $this->fields as $fieldName => $fieldData )
				{

					if( !isset( $fieldData['type'] ) || empty( $fieldData['type'] ) ||
						!isset( $fieldData['format'] ) || empty( $fieldData['type'] ) )
					{
						continue;
					}

					$fieldType    = $fieldData['type'];
					$fieldFormat  = $fieldData['format'];

					$fieldDefaultQuery = '';
					$fieldExtraQuery = '';
					$fieldSizeQuery = '';

					if( isset( $fieldData['default'] ) && $fieldData['default'] !== false )
					{
						$fieldDefaultQuery .= " default ";

						if( $fieldFormat == '%s' )
							$fieldDefaultQuery .= "'" . $fieldData['default'] . "'";
						else
							$fieldDefaultQuery .= $fieldData['default'];
					}

					if( !empty( $fieldData['extra'] ) && $fieldData['extra'] !== false )
					{
						$fieldExtraQuery .= ' ' . $fieldData['extra'];
					}

					if( !empty( $fieldData['size'] ) && $fieldData['size'] !== false )
					{
						$fieldSizeQuery .= '(' . $fieldData['size'] . ')';
					}

					$postTypeTableColumns .= "
$fieldName $fieldType$fieldSizeQuery$fieldExtraQuery$fieldDefaultQuery,";

					if( isset( $fieldData['isPrimaryKey'] ) && $fieldData['isPrimaryKey'] === true )
					{
						$postTypeTableColumnsPrimaryKey = "
PRIMARY KEY  ($fieldName)";
					}
					elseif( isset( $fieldData['isKey'] ) && $fieldData['isKey'] === true )
					{
						$postTypeTableColumnsKeys .= ",
KEY $fieldName ($fieldName)";
					}
				}
			}

			// check that we have at least 1 primary key
			if( empty( $postTypeTableColumnsPrimaryKey ) )
				return;

			// join together the columns queries
			$postTypeTableColumnsQuery = $postTypeTableColumns . $postTypeTableColumnsPrimaryKey . $postTypeTableColumnsKeys;


			/**
			 * Add Meta table
			 */
			$postTypeMetaTableColumnsQuery = "
id bigint(20) unsigned NOT NULL auto_increment,
$this->metaObjectIdField bigint(20) unsigned NOT NULL default 0,
meta_key varchar(255) NOT NULL default '',
meta_value longtext NOT NULL default '',
PRIMARY KEY  (id),
KEY $this->metaObjectIdField ($this->metaObjectIdField),
KEY meta_key (meta_key)";


			$charset_collate = '';
			if ( $wpdb->has_cap( 'collation' ) ) {
				if ( ! empty( $wpdb->charset ) )
					$charset_collate = "DEFAULT CHARACTER SET $wpdb->charset";
				if ( ! empty( $wpdb->collate ) )
					$charset_collate .= " COLLATE $wpdb->collate";
			}

			$postTypeTableOptions = $charset_collate . ' ' . $opts['table_options'];

			if( 'dbDelta' == $opts['upgrade_method'] )
			{
				require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

				$createTableQuery = "CREATE TABLE $postTypeTableName ( $postTypeTableColumnsQuery ) $postTypeTableOptions";
				$createMetaTableQuery = "CREATE TABLE $postTypeMetaTableName ( $postTypeMetaTableColumnsQuery ) $postTypeTableOptions";

				dbDelta( $createTableQuery );
				dbDelta( $createMetaTableQuery );

			}
			else
			{
				// remove table first
				if ( 'delete_first' == $opts['upgrade_method'] )
				{
					$dropTableQuery = "DROP TABLE IF EXISTS $postTypeTableName;";
					$dropMetaTableQuery = "DROP TABLE IF EXISTS $postTypeMetaTableName;";

					$wpdb->query( $dropTableQuery );
					$wpdb->query( $dropMetaTableQuery );
				}

				// create table if it doesn't exist.
				$createTableQuery = "CREATE TABLE IF NOT EXISTS $postTypeTableName ( $postTypeTableColumnsQuery ) $postTypeTableOptions;";
				$createMetaTableQuery = "CREATE TABLE IF NOT EXISTS $postTypeMetaTableName ( $postTypeMetaTableColumnsQuery ) $postTypeTableOptions;";

				$wpdb->query( $createTableQuery );
				$wpdb->query( $createMetaTableQuery );
			}

			update_option( $this->optionName, $this->version );

      // fire action so plugins can do something when the database structure
      // gets updated.
      do_action( 'bw_post_type_db_update', $this, $this->version, $dbVersion );

		}/* dbUpdateCheck() */



    /**
     * Insert or Update post into database table
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (array) $post - Post data array
     * @return (int|false) id of updated/inserted post or false on fail
     */
    public function save( $post )
    {

      /**
       * validation
       */
      if( !is_array( $post ) )
      {
        return false;
      }

      /**
       * Multisite compatibility
       */
      $switchedBlog = false;

      if( isset( $post['blog_id'] ) && !empty( $post['blog_id'] ) && is_multisite() )
      {
        // find the current blog id
        global $blog_id;

        // compare the current id with the specified blog id
        if( $post['blog_id'] != $blog_id )
        {
          switch_to_blog( $post['blog_id'] );
          $switchedBlog = true;
        }

      }

      /**
       * check if we need to save or update
       */
      // $newPost = true;
      $postID = false;

      $defaultFields = $this->get('defaultFields');

      if( isset( $post[ $defaultFields['id'] ] ) && !empty( $post[ $defaultFields['id'] ] ) )
      {
        // UPDATE
        $postID = intval( $post[ $defaultFields['id'] ] );
      }


      /**
       * Status - set default to 'publish'
       */
      // check if this post type has a status field
      if( isset( $defaultFields['status'] ) && !empty( $defaultFields['status'] ) && $defaultFields['status'] )
      {
        // then, check if the status was provided by the user.
        if( !isset( $post[ $defaultFields['status'] ] ) || empty( $post[ $defaultFields['status'] ] ) )
        {
          // only use default status if we are creating a post
          if( !$postID )
          {
            $post[ $defaultFields['status'] ] = 'publish';
          }
        }
      }


      /**
       * Author - set default to current user if creating new post
       */
      // check if this post type has a author field
      if( isset( $defaultFields['author'] ) && !empty( $defaultFields['author'] ) && $defaultFields['author'] )
      {
        // then, check if the author was provided by the user.
        if( !isset( $post[ $defaultFields['author'] ] ) || empty( $post[ $defaultFields['author'] ] ) )
        {
          // only use default author if we are creating a post
          if( !$postID )
          {
            $post[ $defaultFields['author'] ] = get_current_user_id();
          }
        }
      }


      /**
       * Scheduling
       * We allow the user to specify a publish date.
       */
      if( isset( $defaultFields['date'] ) && !empty( $defaultFields['date'] ) && $defaultFields['date'] )
      {
        if( isset( $post[ $defaultFields['date'] ] ) && !empty( $post[ $defaultFields['date'] ] ) )
        {
          // format date if it's a timestamp
          if ( !is_string( $post[ $defaultFields['date'] ] ) )
            $post[ $defaultFields['date'] ] = date( 'Y-m-d H:i:s', $post[ $defaultFields['date'] ] );

          /**
           * Calculate gmt date
           */
          if( isset( $post[ $defaultFields['date'] ] ) && !empty( $post[ $defaultFields['date'] ] ) )
            $post[ $defaultFields['date'] . '_gmt' ] = get_gmt_from_date( $post[ $defaultFields['date'] ] );

        }
        elseif( isset( $post[ $defaultFields['date'] . '_gmt' ] ) && !empty( $post[ $defaultFields['date'] . '_gmt' ] ) )
        {
          // format date if it's a timestamp
          if ( !is_string( $post[ $defaultFields['date'] . '_gmt' ] ) )
            $post[ $defaultFields['date'] . '_gmt' ] = date( 'Y-m-d H:i:s', $post[ $defaultFields['date'] . '_gmt' ] );

          /**
           * Calculate gmt date
           */
          if( isset( $post[ $defaultFields['date'] . '_gmt' ] ) && !empty( $post[ $defaultFields['date'] . '_gmt' ] ) )
            $post[ $defaultFields['date'] ] = get_date_from_gmt( $post[ $defaultFields['date'] . '_gmt' ] );


        }
        elseif( !$postID ) // it's a new post
        {
          $post[ $defaultFields['date'] ] = current_time('mysql');

          /**
           * Calculate gmt date
           */
          if( isset( $post[ $defaultFields['date'] ] ) && !empty( $post[ $defaultFields['date'] ] ) )
            $post[ $defaultFields['date'] . '_gmt' ] = get_gmt_from_date( $post[ $defaultFields['date'] ] );
        }


        /**
         * Determine if the 'date' specified is in the past or in the future
         */
        if( isset( $post[ $defaultFields['date'] ] ) && !empty( $post[ $defaultFields['date'] ] ) &&
          isset( $defaultFields['status'] ) && !empty( $defaultFields['status'] ) && $defaultFields['status'] )
        {
          if( strtotime( $post[ $defaultFields['date'] ] ) > current_time('timestamp') )
          {
            // override post status to future
            $post[ $defaultFields['status'] ] = 'future';
          }
        }

      }

      /**
       * Set modified date if updating
       */
      if( isset( $defaultFields['date_modified'] ) && !empty( $defaultFields['date_modified'] ) && $defaultFields['date_modified'] )
      {
        if( $postID )
        {
          $post[ $defaultFields['date_modified'] ] = current_time('mysql');
        }

        /**
         * Calculate gmt date
         */
        if( isset( $post[ $defaultFields['date_modified'] ] ) && !empty( $post[ $defaultFields['date_modified'] ] ) )
          $post[ $defaultFields['date_modified'] . '_gmt' ] = get_gmt_from_date( $post[ $defaultFields['date_modified'] ] );

      }



      /**
       * bring in the WP database class
       */
      global $wpdb;


      /**
       * Define table names
       */
      $postTypeTableName = $wpdb->prefix . $this->get('tableName');
      $postTypeMetaTableName = $wpdb->prefix . $this->get('metaTableName');



      /**
       * Filter post data and remove unwanted fields
       */
      $postData = array();
      $postDataFormat = array();

      $fields = $this->get('fields');

      if( !empty( $fields ) )
      {
        foreach( $fields as $fieldName => $fieldData )
        {
          // skip post id field
          if( $fieldName == $defaultFields['id'] )
            continue;

          // check if this field was provided in the arguments
          if( !isset( $post[ $fieldName ] ) )
            continue;


          // set post data for this field - value pair
          $postData[ $fieldName ] = $post[ $fieldName ];
          $postDataFormat[] = $fieldData['format'];
        }
      }

      // nothing to save?
      if( empty( $postData ) )
      {
        return false;
      }

      /**
       * Query the database to update or insert rows
       */

      // log errors
      $error = false;

      if( $postID )
      {
        $where = array( $defaultFields['id'] => $postID );
        $whereFormat = array( '%d' );

        $res = $wpdb->update( $postTypeTableName, $postData, $where, $postDataFormat, $whereFormat );

        if( !$res )
          $error = true;
      }
      else
      {
        $res = $wpdb->insert( $postTypeTableName, $postData, $postDataFormat );

        if( $res )
          $postID = $wpdb->insert_id;
        else
          $error = true;
      }



      /**
       * restore current blog
       */
      if( $switchedBlog )
        restore_current_blog();


      /**
       * return event post id
       */
      if( $error )
        return false;
      else
        return $postID;


    }/* save() */



		/**
		 * Delete post(s) from database table
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @param (mixed) $post_or_query - Post(s) to delete or delete query
		 * @return (bool) False on error
		 */
		public function delete( $post_or_query )
		{

		}/* delete() */




		/**
		 * Query post type
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @param (int|array) $args - Post ID or set of arguments to query with
		 * @return (mixed) array of items returned by the query or integer if requesting a count
		 */

		public function query( $args )
		{

			global $wpdb;



			/**
			 * Initialize and validate arguments
			 */
			if( is_array( $args ) )
			{
				// define defaults arguments
				$defaults = array(
					'posts_per_page' => 10,
					'page' => 1,
				);

				// set status default, if this post type has a status
				if( isset( $this->defaultFields['status'] ) && !empty( $this->defaultFields['status'] ) && $this->defaultFields['status'] )
				{
					$defaults[ $this->defaultFields['status'] ] = 'publish';
				}

				// parse arguments to set defaults
				$args = wp_parse_args( $args, $defaults );

			}
			elseif( $postID = intval( $args ) )
			{
				$args = array( $this->defaultFields['id'] => $postID );
			}
			else
			{
				return;
			}





			/**
			 * JOIN Query
			 *
			 * Joinable tables are:
			 * - wp_bwevents
			 * - wp_user
			 * - wp_post
			 *
			 * All the meta tables for these tables are included automatically.
			 *
			 * Note: We also include the wp_bwevents table so that we know
			 * how to alias it when joining other tables.
			 *
			 */

      $metaQueriesData = array();
      if ( isset( $args['meta_query'] ) )
        $metaQueriesData = $this->parseMetaQuery( $args['meta_query'], $joinQueries );


			/**
			 * set event table alias depending on if there are any JOIN queries
			 */
			$postTableAlias = '';

			// add alias if there are any joins
			if( !empty( $joinQueries ) )
			{
				$postTableAlias = $this->alias;
				$postTableAlias .= '.';
			}





			/**
			 * Build final JOIN query
			 */
			$joinQuery = array();

			if( !empty( $joinQueries ) )
			{
				foreach( $joinQueries as $alias => $joinQueryData )
				{
					$table     = $wpdb->prefix . $joinQueryData['table'];
					$type      = $joinQueryData['type'];
					$field     = $alias . '.' . $joinQueryData['field'];
					$fromField = $postTableAlias . $joinQueryData['from_field'];

					$joinQuery[] = "LEFT JOIN $table AS $alias";
					$joinQuery[] = "ON $fromField = $field";

				}
			}

			$joinQuery = implode( "\n", $joinQuery );







			/**
			 * initialize ORDER query.
			 * The actual 'orderby' and 'order' parameters will be checked later to
			 * give the meta_query precedence.
			 */
			$orderQuery = array();




			/**
			 * Initialize GROUP query
			 * The actual 'group_by' parameter will be checked later to
			 * give the meta_query precedence.
			 */
			$groupQuery = array();



			/**
			 * Initialize SELECT query
			 * The actual 'group_by' parameter will be checked later to
			 * give the meta_query precedence.
			 */
			$selectQuery = array();






			/**
			 * Add WHERE query
			 */
			$whereQuery = array();
			$whereQuery[] = "WHERE 1=1";


			/**
			 * add main fields specified in $args
			 */
			// add table alias
			if( !empty( $this->fields ) )
			{
				foreach( $this->fields as $metaKey => $fieldData )
				{

					if( !isset( $args[ $metaKey ] ) )
						continue;

					$fieldFormat = $fieldData['format'];

					// default to '=' for compare
					$compare = '=';

					// get meta value
					$metaValue = $args[ $metaKey ];

					// check different types of values provided
					if( is_array( $metaValue ) )
					{
						if( $fieldFormat == '%s' )
						{
							$formattedValueArray = array();

							foreach( $metaValue as $v )
							{
								$formattedValueArray[] = "'" . $v . "'";
							}

							$metaValue = $formattedValueArray;
						}

						$metaValue = '(' . implode( ',', $metaValue ) . ')';
						$compare = 'IN';
					}
					elseif( $fieldFormat == '%s' )
					{
						$metaValue = "'" . $metaValue . "'";
					}

					// add table alias to meta key
					$metaKey = $postTableAlias . $metaKey;

					// add current meta query to the main WHERE query
					$whereQuery[] = "AND $metaKey $compare $metaValue";

				}
			}


      $mainWhereQuery = $this->createMetaSQLQuery( $metaQueriesData, $postTableAlias, $metaKeysWhereQuery, $orderQuery, $groupQuery, $joinQueries, $selectQuery );


			/**
			 * The full where query is going to be structured like so:
			 *
			 *  $whereQuery = WHERE 1=1 AND ( $mainWhereQuery ) AND ( $metaKeysWhereQuery )
			 *
			 * This way they $mainWhereQuery can use "OR" as relation, while still
			 * using "AND" for all WHERE queries for the join meta keys.
			 *
			 */
			if( !empty( $mainWhereQuery ) && count( $mainWhereQuery ) > 1 )
			{
				$whereQuery[] = "AND (";
				$whereQuery = array_merge( $whereQuery, $mainWhereQuery );
				$whereQuery[] = ")";
			}

			if( !empty( $metaKeysWhereQuery ) && count( $metaKeysWhereQuery ) > 1 )
			{
				$whereQuery[] = "AND (";
				$whereQuery = array_merge( $whereQuery, $metaKeysWhereQuery );
				$whereQuery[] = ")";
			}

			$whereQuery = implode( "\n", $whereQuery );




			/**
			 * Complete the ORDER query
			 */
			if( isset( $args['orderby'] ) && !empty( $args['orderby'] ) )
			{
				$orderby = $args['orderby'];

				// check if an order was specified
				$defaultOrder = '';
				if( isset( $args['order'] ) && !empty( $args['order'] ) && in_array( strtoupper( $args['order'] ), array( '', 'ASC', 'DESC' ) ) )
					$defaultOrder = strtoupper( $args['order'] );

				if( is_string( $orderby ) )
					$orderby = array( $orderby );

				foreach( $orderby as $metaKey => $order )
				{
					/**
					 * check if the order was NOT specified,
					 * so there is no array key (in other words, the key is an integer)
					 *
					 *  $orderby = array(
					 * 		'somefield' => 'ASC',
					 * 		'other',    // in this case we use the default order
					 * 		'field' => 'DESC',
					 * 	);
					 *
					 */
					if( is_int( $metaKey ) )
					{
						$metaKey = $order;
						$order = $defaultOrder;
					}

					// Force Uppercase
					$order = strtoupper( $order );

					// check if the field is set in the current table
					if( !isset( $this->fields[ $metaKey ] ) )
						continue;

					// order should default to DESC for date fields
					if( empty( $order ) && $this->fields[ $metaKey ]['type'] == 'datetime' )
						$order = 'DESC';

					// check if the field is set in the current table and if the order is a valid order
					if( !in_array( $order, array( '', 'ASC', 'DESC' ) ) )
						continue;

					// add table alias
					$metaKey = $postTableAlias . $metaKey;

					$orderQuery[] = "$metaKey $order";

				}

			}

			// add ORDER query now that we're done adding to it.
			// default: order by date DESC
			if( empty( $orderQuery ) )
			{
				$dateFieldName = $this->defaultFields['date'];
				$orderQuery = "ORDER BY $dateFieldName DESC";
			}
			else
			{
				$orderQuery = 'ORDER BY ' . implode( ", \n", $orderQuery );
			}







			/**
			 * Complete the GROUP query
			 */
			if( isset( $args['groupby'] ) && !empty( $args['groupby'] ) )
			{
				$groupby = $args['groupby'];

				if( is_string( $groupby ) )
					$groupby = array( $groupby );

				foreach( $groupby as $metaKey )
				{
					// check if the field is set in the current table
					if( !isset( $this->fields[ $metaKey ] ) )
						continue;

					// add table alias
					$metaKey = $postTableAlias . $metaKey;

					$groupQuery[] = $metaKey;

				}

			}

			// add GROUP BY query now that we're done adding to it.
			// default: order by date DESC
			if( empty( $groupQuery ) )
				$groupQuery = '';
			else
				$groupQuery = 'GROUP BY ' . implode( ", \n", $groupQuery );








			/**
			 * LIMIT query
			 */
			$limitQuery = array();

			if( ( !isset( $args['count'] ) || $args['count'] !== true ) &&
				( !isset( $args['id'] ) || empty( $args['id'] ) ) &&
				$args['posts_per_page'] != -1
			)
			{
				$limit = 10; // defaults to 10
				$page = 1; // defaults to 10

				if( intval( $args['posts_per_page'] ) !== false )
					$limit = intval( $args['posts_per_page'] );

				if( intval( $args['page'] ) !== false )
					$page = intval( $args['page'] );

				// compute offset
				$offset = ( $page - 1 ) * $limit;

				$limitQuery[] = "LIMIT $offset, $limit";

			}

			$limitQuery = implode( "\n", $limitQuery );









			/**
			 * Continue SELECT query
			 */

			// get table name
			$postTableName = $wpdb->prefix . $this->tableName;


			if( isset( $args['count'] ) && $args['count'] === true )
			{
				// if we set the count parameter, we just output the count.
				$selectQuery = "COUNT(*)";
			}
			else
			{

				if( isset( $args['fields'] ) && !empty( $args['fields'] ) )
				{
					$fields = $args['fields'];

					if( !is_array( $fields ) )
						$fields = array( $fields );

					$fieldOutputQueries = array();

					foreach( $fields as $fieldKey => $fieldAs )
					{
						$fieldAsQuery = '';

						if( is_int( $fieldKey ) )
						{
							$fieldAsQuery = $fieldAs;
							$fieldKey = $fieldAs;
						}
						else
						{
							$fieldAsQuery = "$fieldKey AS '$fieldAs'";
						}

						if( isset( $this->fields[ $fieldKey ] ) )
							$fieldOutputQueries[] = $postTableAlias . $fieldAsQuery;

					}

					$selectQuery = array_merge( $fieldOutputQueries, $selectQuery );

				}
				else
				{
					if( empty( $postTableAlias ) && !empty( $selectQuery ) )
					{
						array_unshift( $selectQuery, $postTableName . ".*" );
					}
					else
					{
						array_unshift( $selectQuery, $postTableAlias . "*" );
					}

				}


				$selectQuery =  implode( ",", $selectQuery );

			}

			$selectQuery = "SELECT $selectQuery \nFROM $postTableName";

			// add alias if there are any joins
			if( !empty( $postTableAlias ) )
			{
				$eventsTableAliasTrimmed = trim( $postTableAlias, '.' );
				$selectQuery .= "\nAS $eventsTableAliasTrimmed";
			}







			/**
			 * merge all queries
			 */
			$sqlQuery = "$selectQuery\n$joinQuery\n$whereQuery\n$groupQuery\n$orderQuery\n$limitQuery";


      // remove spaces, tabs and new lines
      $sqlQuery = preg_replace( '/[\n|\s|\t]+/', ' ', $sqlQuery );



      /**
       * Perform Query
       */
			$posts = $wpdb->get_results( preg_replace("/\s+/", " ", $sqlQuery) );








			/**
			 * Format output
			 */
			if( isset( $args['count'] ) && $args['count'] == true )
			{
				$posts = intval( $posts[0]->{'COUNT(*)'} );
			}
			else
			{
				// set to empty array if empty
				if( !$posts || empty( $posts ) )
					$posts = array();

				// return  single event if an id was specified
				if( isset( $args['id'] ) && !empty( $args['id'] ) && !empty( $posts ) )
					$posts = $posts[0];

			}



			return $posts;

		}/* query() */


    public function parseMetaQuery($metaQuery, &$joinQueries = array(), &$joinTablesAliasIndex = array())
    {
      if ( !is_array( $metaQuery ) || empty( $metaQuery ) )
        return;


      if ( !is_array( $joinQueries ) )
        $joinQueries = array();

      $data = array();


      /**
       * check if this is a sub-query
       */
      $isQueryTree = false;

      if ( isset( $metaQuery['relation'] ) && !empty( $metaQuery['relation'] ) )
        $isQueryTree = true;

      if ( !$isQueryTree  )
      {
        foreach ( $metaQuery as $metaQueryKey => $metaQueryPart )
        {
          if ( is_int( $metaQueryKey ) && is_array( $metaQueryPart ) )
          {
            $isQueryTree = true;
            break;
          }
        }
      }


      /**
       * If it's a sub-query start recurtion on the array elements of the query
       */
      if ( $isQueryTree )
      {
        $metaQueryDataParts = array();

        foreach ( $metaQuery as $metaQueryKey => $metaQueryPart )
        {
          if ( !is_array( $metaQueryPart ) )
            continue;

          $metaQueryData = $this->parseMetaQuery( $metaQueryPart, $joinQueries, $joinTablesAliasIndex );

          if ( isset( $metaQueryData ) && !empty( $metaQueryData ) )
            $metaQueryDataParts[] = $metaQueryData;
        }

        // if we have any valid meta query data, add the relation
        if ( !empty( $metaQueryDataParts ) )
        {
          $data['queries'] = $metaQueryDataParts;

          // save relation
          $relation = 'AND';
          if ( isset( $metaQuery['relation'] ) && !empty( $metaQuery['relation'] ) )
            $relation = $metaQuery['relation'];

          $data['relation'] = $relation;
        }

      }
      else
      {

        /**
         * Check if meta query specifies a connection to an object
         */
        $connectionType = '';

        if( isset( $metaQuery['p2p_connection_type'] ) && !empty( $metaQuery['p2p_connection_type'] ) )
        {
          // get connection type
          $connectionType = $metaQuery['p2p_connection_type'];

          // get connection direction
          $connectionDir = 'from';
          if( isset( $metaQuery['p2p_connection_direction'] ) && !empty( $metaQuery['p2p_connection_direction'] ) && in_array( strtolower( $metaQuery['p2p_connection_direction'] ), array( 'to', 'from' ) ) )
            $connectionDir = strtolower( $metaQuery['p2p_connection_direction'] );

          // set key to p2p_to or p2p_from
          if( !isset( $metaQuery['key'] ) || empty( $metaQuery['key'] ) )
            $metaQuery['key'] = 'p2p_' . $connectionDir;

          $joinTableAlias = 'p2p';

          // $joinQueries[ $joinTableAlias ] = array(
          //  'object_type' => $objectType,
          //  'table' => $joinTableName,
          //  'type' => $joinType,
          //  'field' => $joinField,
          //  'from_field' => $joinFromField,
          // );

        }



        // Check if the meta query has the "fields" parameter.
        // If yes, we tread this meta query as an embedded meta query that
        // needs to match the fields array, provided that $metaQuery['fields']
        // is given in the form of "column_name" => "value".
        //
        // NOTE: for now we just support fields that exist in the post table.
        // no actual metadata will be matched (no JOIN query needed)
        //
        if( isset( $metaQuery['fields'] ) && !empty( $metaQuery['fields'] ) )
          return $metaQuery;


        // check if the meta query has a key
        if( !isset( $metaQuery['key'] ) || empty( $metaQuery['key'] ) )
          return;

        // the object type default
        $objectType = 'self';

        // check if an object type is specified
        if( isset( $metaQuery['object_type'] ) && !empty( $metaQuery['object_type'] ) )
          $objectType = $metaQuery['object_type'];


        // check what type of object we want to join and set the join from field
        switch( $objectType )
        {
          case 'self':

            $joinFromField = $this->defaultFields['id'];

            break;

          case 'parent':

            $joinFromField = $this->defaultFields['parent'];

            break;

          case 'author':

            $joinFromField = $this->defaultFields['author'];

            break;

          case 'author':

            $joinFromField = $this->defaultFields['id'];

            break;

          default:

            if( is_string( $objectType ) )
            {
              $joinFromField = $objectType;
            }
            else
            {
              $joinFromField = $this->defaultFields['id'];
            }

            break;
        }


        // if the object type of the field is NOT one of the supported ones, skip
        $supportedObjectTypes = BWPostTypeFactory::getPostTypes();
        $supportedObjectTypes = array_merge( $supportedObjectTypes, array( 'self', 'parent' ) );

        if( !isset( $this->fields[ $joinFromField ] ) && !in_array( $this->fields[ $joinFromField ]['object_type'], $supportedObjectTypes ) )
          return;

        // get the object type
        if( $objectType != 'self' )
        {
          $objectType = $this->fields[ $joinFromField ]['object_type'];
        }


        if( empty( $connectionType ) )
        {

          // Define what type of join we are doing
          // - 'self': multiple meta keys can be compared in the same JOIN table
          // - 'parent': make a single join query for all parent queries
          // - 'meta': each meta key needs a new JOIN query.
          //       This type of join requires an extra WHERE clause as well to set the meta_key
          $joinType = 'self';

          if( $objectType == 'parent' )
          {
            $joinType = 'parent';
          }

          if( in_array( $objectType, array('self', 'parent') ) )
          {
            $objectType = $this->name;
          }

          $joinPostType = BWPostTypeFactory::factory( $objectType );

          $joinTableAlias  = $joinPostType->alias;
          $joinField       = $joinPostType->defaultFields['id'];
          $joinTableName   = $joinPostType->tableName;
          $joinTableFields = $joinPostType->fields;


          // check if meta key is in the main join table or if we should check the meta table instead
          if( isset( $joinPostType->metaTableName ) && !empty( $joinPostType->metaTableName ) && ( empty( $joinTableFields ) || !isset( $joinTableFields[ $metaQuery['key'] ] ) ) )
          {
            // set join type to 'meta'
            $joinType = 'meta';

            // define the meta table
            $joinTableName   = $joinPostType->metaTableName;
            $joinField       = $joinPostType->metaObjectIdField;

            // calculate alias with suffix
            $joinTableAlias .= 'm';

          }

        }
        else
        {
          $joinType = 'p2p';
          $joinTableName = 'p2p';
          $joinTableAlias = 'p2p';

          if( $connectionDir == 'to' )
            $joinField = 'p2p_from';
          else
            $joinField = 'p2p_to';

        }


        if( $joinType == 'parent' )
        {
          $joinTableAlias .= '_parent';
        }

        if( in_array( $joinType, array( 'meta', 'p2p' ) ) )
        {

          $joinTableAliasSuffix = '';

          if( !isset( $joinTablesAliasIndex[ $joinTableName ] ) )
            $joinTablesAliasIndex[ $joinTableName ] = 1;

          if( $joinTablesAliasIndex[ $joinTableName ] > 1 )
            $joinTableAliasSuffix = $joinTablesAliasIndex[ $joinTableName ];

          // increase alias index
          $joinTablesAliasIndex[ $joinTableName ]++;

          // append suffix to table alias
          $joinTableAlias .= $joinTableAliasSuffix;
        }


        // add join table, if necessary.
        // only create JOIN queries for all join types but 'self'
        if( in_array( $joinType, array( 'meta', 'parent', 'p2p' ) ) )
        {
          if( !isset( $joinQueries[ $joinTableAlias ] ) )
          {
            $joinQueries[ $joinTableAlias ] = array(
              'object_type' => $objectType,
              'table' => $joinTableName,
              'type' => $joinType,
              'field' => $joinField,
              'from_field' => $joinFromField,
            );
          }

          /**
           * add join table reference to meta query.
           *
           * We'll check this during the WHERE query.
           * if the table_alias is not defined, it means that the field is in the bwevents table.
           *
           * Then we'll check if we have any join queries at all and
           * if yes, we'll add the event table alias.
           *
           */
          $metaQuery['table_alias'] = $joinTableAlias;

        }

        // save meta query to new meta query data array.
        $data = $metaQuery;

      }

      return $data;

    } /* parseMetaQuery() */


    public function createMetaSQLQuery($metaQuery, $postTableAlias, &$metaKeysWhereQuery = array(), &$orderQuery = array(), &$groupQuery = array(), &$joinQueries = array(),  &$selectQuery = array(), $recursionIndex = 0)
    {
      if ( !is_array( $metaQuery ) || empty( $metaQuery ) )
        return;

      $whereQuery = array();

      if ( !is_array( $metaKeysWhereQuery ) )
        $metaKeysWhereQuery = array('1=1');


      /**
       * Check if this meta query is a query tree
       */
      if( isset( $metaQuery['queries'] ) )
      {

        $spacer = '  ';
        for ( $i=0; $i < $recursionIndex; $i++ )
          $spacer .= '  ';


        $relation = 'AND';
        if( isset( $metaQuery['relation'] ) )
          $relation = $metaQuery['relation'];

        if ( $relation == 'OR' )
          $whereQuery[] = $spacer . "1!=1";
        else
          // default value for "AND" relation
          $whereQuery[] = $spacer . "1=1";

        foreach( $metaQuery['queries'] as $metaQueryPart )
        {
          $whereQueryPart = $this->createMetaSQLQuery( $metaQueryPart, $postTableAlias, $metaKeysWhereQuery, $orderQuery, $groupQuery, $joinQueries, $selectQuery, $recursionIndex + 1 );

          if ( !empty( $whereQueryPart ) )
          {
            $whereQueryPartIndented = array();
            foreach ( $whereQueryPart as $line )
              $whereQueryPartIndented[] = $spacer . $line;

            $whereQuery[] = $spacer . $relation;
            $whereQuery[] = $spacer . '(';
            $whereQuery = array_merge( $whereQuery, $whereQueryPartIndented );
            $whereQuery[] = $spacer . ')';
          }

        }

      }
      else
      {

        // set default query type
        $metaQueryType = 'self';

        // set default table alias
        $joinTableAlias = $postTableAlias;

        // set default table name
        $joinTableName = $this->tableName;

        // set default object type
        $objectType = $this->name;



        // Check if the meta query has the "fields" parameter.
        // If yes, we tread this meta query as an embedded meta query that
        // needs to match the fields array, provided that $metaQuery['fields']
        // is given in the form of "column_name" => "value".
        //
        // NOTE: for now we just support fields that exist in the post table.
        // no actual metadata will be matched (no JOIN query needed)
        //
        if( isset( $metaQuery['fields'] ) && !empty( $metaQuery['fields'] ) )
        {

          $spacer = '';
          for ( $i=0; $i < $recursionIndex; $i++ )
            $spacer .= '  ';

          $whereQuery[] = $spacer . "1=1";
          foreach ( $metaQuery['fields'] as $metaKey => $metaValue )
          {
            // prepare WHERE query key and value
            $metaKeyAlias = $joinTableAlias . $metaKey;
            $metaValue = "'" . $metaValue . "'";

            $whereQuery[] = $spacer . "AND $metaKeyAlias = $metaValue";
          }

          return $whereQuery;
        }



        // check if key is defined. If not, skip meta query
        if( !isset( $metaQuery['key'] ) || empty( $metaQuery['key'] ) )
          return;


        // Get meta key.
        $metaKey = $metaQuery['key'];


        // get the 'compare' variable
        $compare = '=';

        if( isset( $metaQuery['compare'] ) && !empty( $metaQuery['compare'] ) )
          $compare = $metaQuery['compare'];




        // check if we have a join for this query
        if( isset( $metaQuery['table_alias'] ) && !empty( $metaQuery['table_alias'] ) && isset( $joinQueries[ $metaQuery['table_alias'] ] ) )
        {
          $joinTableAlias = $metaQuery['table_alias'];
          $joinTableAlias .= '.';

          // get the JOIN query details
          $metaQueryJoinData = $joinQueries[ $metaQuery['table_alias'] ];
          $metaQueryType     = $metaQueryJoinData['type'];
          $joinTableName     = $metaQueryJoinData['table'];
          $objectType        = $metaQueryJoinData['object_type'];

        }



        // check if the join type is "meta"
        if( $metaQueryType == 'meta' )
        {
          // add table alias to meta key
          // set query key to 'meta_value' in case this is a meta join query
          $metaKeyAlias = $joinTableAlias . 'meta_value';

          // add to $metaKeysWhereQuery based on the current meta key
          $metaKeysWhereQuery[] = 'AND ' . $joinTableAlias . "meta_key = '$metaKey'";
        }
        elseif( $metaQueryType == 'p2p' && isset( $metaQuery['p2p_connection_type'] ) && !empty( $metaQuery['p2p_connection_type'] ) )
        {
          // add table alias to meta key
          $metaKeyAlias = $joinTableAlias . $metaKey;

          // get connection type
          $connectionType = $metaQuery['p2p_connection_type'];

          // add to $metaKeysWhereQuery based on the current meta key
          $metaKeysWhereQuery[] = 'AND ' . $joinTableAlias . "p2p_type = '$connectionType'";
        }
        else
        {
          // add table alias to meta key
          $metaKeyAlias = $joinTableAlias . $metaKey;
        }



        // check if a value was specified
        if( isset( $metaQuery['value'] ) )
        {
          // get meta value
          $metaValue = $metaQuery['value'];

          // set default field format to string '%s'
          $fieldFormat = '%s';

          // get fields for the object type
          $metaQueryPostType = BWPostTypeFactory::factory( $objectType );
          $metaQueryPostTypeFields = $metaQueryPostType->get('fields');

          // find field format on table structure
          if( $metaQueryType != 'meta' && isset( $metaQueryPostTypeFields[ $metaKey ] ) )
          {
            $fieldFormat = $metaQueryPostTypeFields[ $metaKey ]['format'];
          }


          // check different types of values provided
          if( is_array( $metaValue ) )
          {
            if( $fieldFormat == '%s' )
            {
              $formattedValueArray = array();

              foreach( $metaValue as $v )
              {
                $formattedValueArray[] = "'" . $v . "'";
              }

              $metaValue = $formattedValueArray;
            }

            $metaValue = '(' . implode( ',', $metaValue ) . ')';
            $compare = 'IN';
          }
          elseif( $fieldFormat == '%s' )
          {
            $metaValue = "'" . $metaValue . "'";
          }


          // add current meta query to the main WHERE query
          $whereQuery[] = "$metaKeyAlias $compare $metaValue";

        }



        /**
         * Order query for this meta query
         */
        if( isset( $metaQuery['order'] ) && !empty( $metaQuery['order'] ) && in_array( strtoupper( $metaQuery['order'] ), array( '', 'ASC', 'DESC' ) ) )
        {
          $orderQueryTmp = $metaKeyAlias;

          if( isset( $metaQuery['order_type'] ) && !empty( $metaQuery['order_type'] ) )
          {
            switch( $metaQuery['order_type'] )
            {
              case 'num':
                $orderQueryTmp = "$metaKeyAlias * 1";
                break;

              case 'count':
                $orderQueryTmp = "count( distinct $metaKeyAlias )";
                break;

              default:
                break;
            }
          }

          $orderQuery[] = $orderQueryTmp . " " . strtoupper( $metaQuery['order'] );
        }


        /**
         * GROUP query for this meta query
         */
        if( isset( $metaQuery['group'] ) && !empty( $metaQuery['group'] ) && $metaQuery['group'] )
          $groupQuery[] = $metaKeyAlias;







        /**
         * Add SELECT field for this meta query
         */
        if( isset( $metaQuery['output'] ) && !empty( $metaQuery['output'] ) )
        {
          $metaQueryOutput = $metaQuery['output'];

          if( $metaQueryOutput )
          {

            $selectQueryTmp = $metaKeyAlias;

            if( isset( $metaQuery['output_type'] ) && !empty( $metaQuery['output_type'] ) )
            {
              switch( $metaQuery['output_type'] )
              {
                case 'count':

                  $selectQueryTmp = "count( distinct $metaKeyAlias )";

                  if( !is_string( $metaQueryOutput ) )
                    $metaQueryOutput = $metaKey . '_count';

                  break;

                default:
                  break;
              }
            }

            if( !is_string( $metaQueryOutput ) )
              $metaQueryOutput = $metaKey;

            $selectQuery[] = "$selectQueryTmp AS '$metaQueryOutput'";
          }
        }


      }

      return $whereQuery;

    } /* createMetaSQLQuery() */


	}

