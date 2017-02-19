<?php

	namespace SocialStreams;

	class BWPostTypeFactory
	{

		static private $customPostTypes = array(

			'post' => array(
				'name' => 'post',
				'tableName' => 'posts',
				'alias' => 'p',
				'hasMeta' => true,
				'metaTableName' => 'postmeta',

				// meta join field
				'metaObjectIdField' => 'post_id',

				// default fields names
				'defaultFields' => array(
					'id' => 'ID',
					'status' => 'post_author',
					'author' => 'post_parent',
					'parent' => 'post_status',
					'menu_order' => 'menu_order',
					'date' => 'post_date',
					'date_modified' => 'post_modified',
				),

				// fields
				'fields' => array(
					'ID' => array(
						'format' => '%d',
					),
					'post_author' => array(
						'object_type' => 'user',
						'format' => '%d',
					),
					'post_date' => array(
						'format' => '%s',
					),
					'post_date_gmt' => array(
						'format' => '%s',
					),
					'post_content' => array(
						'format' => '%s',
					),
					'post_title' => array(
						'format' => '%s',
					),
					'post_excerpt' => array(
						'format' => '%s',
					),
					'post_status' => array(
						'format' => '%s',
					),
					'comment_status' => array(
						'format' => '%s',
					),
					'ping_status' => array(
						'format' => '%s',
					),
					'post_password' => array(
						'format' => '%s',
					),
					'post_name' => array(
						'format' => '%s',
					),
					'to_ping' => array(
						'format' => '%s',
					),
					'pinged' => array(
						'format' => '%s',
					),
					'post_modified' => array(
						'format' => '%s',
					),
					'post_modified_gmt' => array(
						'format' => '%s',
					),
					'post_content_filtered' => array(
						'format' => '%s',
					),
					'post_parent' => array(
						'object_type' => 'post',
						'format' => '%d',
					),
					'guid' => array(
						'format' => '%s',
					),
					'menu_order' => array(
						'format' => '%d',
					),
					'post_type' => array(
						'format' => '%s',
					),
					'post_mime_type' => array(
						'format' => '%s',
					),
					'comment_count' => array(
						'format' => '%d',
					),
				),
			),

			'user' => array(
				'name' => 'user',
				'tableName' => 'users',
				'alias' => 'u',
				'hasMeta' => true,
				'metaTableName' => 'usermeta',

				// meta join field
				'metaObjectIdField' => 'user_id',

				// default fields names
				'defaultFields' => array(
					'id' => 'ID',
					'status' => 'user_status',
					'author' => false,
					'parent' => false,
					'menu_order' => false,
					'date' => false,
					'date_modified' => false,
				),

				// fields
				'fields' => array(
					'ID' => array(
						'format' => '%d',
					),
					'user_login' => array(
						'format' => '%s',
					),
					'user_pass' => array(
						'format' => '%s',
					),
					'user_nicename' => array(
						'format' => '%s',
					),
					'user_email' => array(
						'format' => '%s',
					),
					'user_url' => array(
						'format' => '%s',
					),
					'user_registered' => array(
						'format' => '%s',
					),
					'user_activation_key' => array(
						'format' => '%s',
					),
					'user_status' => array(
						'format' => '%s',
					),
					'display_name' => array(
						'format' => '%s',
					),
					'spam' => array(
						'format' => '%d',
					),
					'deleted' => array(
						'format' => '%d',
					),
				),
			),
		);

		static private $defaultFields = array(
			'id' => array(
				'type' => 'bigint',
				'size' => 20,
				'default' => false,
				'extra' => 'unsigned NOT NULL auto_increment',
				'isKey' => true,
				'isPrimaryKey' => true,
				'object_type' => false, // 'user', 'post', 'term', 'self'
				'format' => '%d',
			),
			'status' => array(
				'type' => 'varchar',
				'size' => 44,
				'default' => '',
				'extra' => 'NOT NULL',
				'isKey' => true,
				'object_type' => false,
				'format' => '%s',
			),
			'author' => array(
				'type' => 'bigint',
				'size' => 20,
				'default' => 0,
				'extra' => 'unsigned NOT NULL',
				'isKey' => true,
				'object_type' => 'user', // 'user', 'post', 'term', 'self'
				'format' => '%d',
			),
			'parent' => array(
				'type' => 'bigint',
				'size' => 20,
				'default' => 0,
				'extra' => 'unsigned NOT NULL',
				'isKey' => true,
				'object_type' => 'parent', // 'user', 'post', 'term', 'self'
				'format' => '%d',
			),
			'menu_order' => array(
				'type' => 'int',
				'size' => 20,
				'default' => 0,
				'extra' => 'unsigned NOT NULL',
				'isKey' => true,
				'object_type' => false, // 'user', 'post', 'term', 'self'
				'format' => '%d',
			),
			'date' => array(
				'type' => 'datetime',
				'default' => '0000-00-00 00:00:00',
				'extra' => 'NOT NULL',
				'isKey' => false,
				'object_type' => false,
				'format' => '%s',
			),
			'date_gmt' => array(
				'type' => 'datetime',
				'default' => '0000-00-00 00:00:00',
				'extra' => 'NOT NULL',
				'isKey' => false,
				'object_type' => false,
				'format' => '%s',
			),
			'date_modified' => array(
				'type' => 'datetime',
				'default' => '0000-00-00 00:00:00',
				'extra' => 'NOT NULL',
				'isKey' => false,
				'object_type' => false,
				'format' => '%s',
			),
			'date_modified_gmt' => array(
				'type' => 'datetime',
				'default' => '0000-00-00 00:00:00',
				'extra' => 'NOT NULL',
				'isKey' => false,
				'object_type' => false,
				'format' => '%s',
			),
		);


		public function __construct(){}

		/**
		 * @internal Missing Description
		 *
		 * @author Andrew Vivash <@andrewvivash>
		 * @package Utils.php
		 * @since 1.0
		 * @param arguments
		 * @return null
		 */

    static public function factory( $args, $force = false )
		{
			$customPostTypeName = false;

			if( is_string( $args ) )
				$customPostTypeName = $args;

			if( is_array( $args ) && isset( $args['name'] ) )
				$customPostTypeName = $args['name'];


      // check if we need to force the creation of the DB
      if ( $force && isset( self::$customPostTypes[ $customPostTypeName ] ) )
        unset( self::$customPostTypes[ $customPostTypeName ] );

			// If a name is specified, get the post type object and return it
			if( isset( self::$customPostTypes[ $customPostTypeName ] ) )
			{
				if( is_array( self::$customPostTypes[ $customPostTypeName ] ) )
				{
					self::$customPostTypes[ $customPostTypeName ] = new BWPostType( self::$customPostTypes[ $customPostTypeName ], false );
				}

				return self::$customPostTypes[ $customPostTypeName ];
			}

			/**
			 * register new custom post type
			 */

			// To do so we need an array
			if( !is_array( $args ) )
				return;

			// required fields
			$required = array('name', 'fields');

			// check required fields
			foreach( $required as $argName )
			{
				if( !isset( $args[ $argName ] ) || empty( $args[ $argName ] ) )
					return;
			}


			// apply default arguments
			$args = wp_parse_args( $args, array(
				'version'           => '1.0.0',
				'optionName'        => 'bw_' . $customPostTypeName . 's_table_version',
				'tableName'         => $customPostTypeName . 's',
				'alias'             => $customPostTypeName,
				'hasMeta'           => true,
				'metaTableName'     => $customPostTypeName . 'meta',

				// meta table join field definitions
				'metaObjectIdField' => $customPostTypeName . '_id',

				// default table fields
				'defaultFields'     => array(),

				// fields
				'fields'            => array(),
			));

			/**
			 * Add default fields
			 */
			$args['defaultFields'] = wp_parse_args( $args['defaultFields'], array(
				'id' => true,
				'status' => true,
				'author' => true,
				'parent' => true,
				'menu_order' => true,
				'date' => true,
				'date_modified' => true,
			));

			/**
			 * don't allow bad default fields
			 */
			if( empty( $args['defaultFields'] ) || !isset( $args['defaultFields']['id'] ) || empty( $args['defaultFields']['id'] ) || !$args['defaultFields']['id'] )
			{
				return;
			}

			/**
			 * Add default fields
			 */
			$defaultFields = array();
			$defaultFieldsNames = array();
			foreach( $args['defaultFields'] as $defaultFieldID => $defaultFieldName )
			{
				// validate field name
				if( $defaultFieldName === true )
				{
					$defaultFieldName = $defaultFieldID;
				}
				elseif( !is_string( $defaultFieldName ) )
				{
					continue;
				}

				// check if default field exists
				if( !isset( self::$defaultFields[ $defaultFieldID ] ) )
					continue;

				// save default field data
				$defaultFields[ $defaultFieldName ] = self::$defaultFields[ $defaultFieldID ];

				if( in_array( $defaultFieldID, array( 'date', 'date_modified' ) ) )
				{
					$defaultFields[ $defaultFieldName . '_gmt' ] = self::$defaultFields[ $defaultFieldID . '_gmt' ];
				}

				$defaultFieldsNames[ $defaultFieldID ] = $defaultFieldName;

			}

			// don't allow an empty default fields array
			if( empty( $defaultFields ) )
				return;

			// merge default field data
			$args['fields'] = array_merge( $defaultFields, $args['fields'] );
			$args['defaultFields'] = $defaultFieldsNames;


			// validate arguments
			// make sure that alias is unique
			if( !empty( self::$customPostTypes ) )
			{
				$duplicateAlias = false;

				foreach( self::$customPostTypes as $predefinedPostType => $predefinedPostTypeObject )
				{
					if( is_array( $predefinedPostTypeObject ) )
					{
						$predefinedPostTypeAlias = $predefinedPostTypeObject['alias'];
					}
					else
					{
						$predefinedPostTypeAlias = $predefinedPostTypeObject->get('alias');
					}

					if( $predefinedPostTypeAlias == $args['alias'] )
					{
						$duplicateAlias = true;
						break;
					}
				}

				if( $duplicateAlias )
					return;
			}

			$postType = new BWPostType( $args );

			// save object in cache
			self::$customPostTypes[ $customPostTypeName ] = $postType;


		}/* factory() */


		/**
		 * Get an array of all the registered post types, including default ones
		 *
		 * @author Alessandro Biavati <ale@briteweb.com>
		 * @package briteweb/package
		 * @since 1.0.0
		 * @return (array) - array of post type names
		 */

		static public function getPostTypes()
		{
			return array_keys( self::$customPostTypes );

		}/* getPostTypes() */

	}


