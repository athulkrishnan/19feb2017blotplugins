<?php

  namespace SocialStreams;

  /**
   * Implements example command.
   */
  class WpCliCommand extends \WP_CLI_Command
  {

    /**
     * Fetch Social Streams posts on current site
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp socialstreams fetch
     *
     */
    public function fetch( $args, $assoc_args )
    {
      // fetch social streams for site
      $this->fetchSite();

    }/* fetch() */

    /**
     * Fetch Social Streams posts on entire network
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp socialstreams fetch_all
     *
     */
    public function fetch_all( $args, $assoc_args )
    {
      if ( is_multisite() )
      {
        // loop sites
        $sitesIDs = $this->getAllSitesIDs();
        if ( !empty( $sitesIDs ) )
        {
          foreach ( $sitesIDs as $index => $siteID )
          {
            // fetch social streams for site
            $this->fetchSite( $siteID );

            // wait a second before making the next api calls
            if ( $index > 0 )
              sleep(1);
          }
        }

        // Print a success message
        $sitesLabel = 'sites';
        if ( count( $sitesIDs ) == 1 )
          $sitesLabel = 'site';

        \WP_CLI::success( count( $sitesIDs ) . ' ' . $sitesLabel . ' fetched.' );

      }
      else
      {
        // fetch social streams for current site
        $this->fetchSite();
      }

    }/* fetch_all() */

    private function fetchSite($siteID = null)
    {
      if ( is_multisite() && !is_null( $siteID ) )
        switch_to_blog( $siteID );

      // run database updates if needed
      do_action('ss_setup_db_schema');

      // fetch socialstreams
      do_action('socialstreams_fetch');

      // set the success message
      if ( is_multisite() && !is_null( $siteID ) )
        $successMessage = 'Social Streams fetched for blog ID ' . $siteID . ' (' . $homeUrl . ').';
      else
        $successMessage = 'Social Streams fetched.';

      // restore current blog
      if ( is_multisite() && !is_null( $siteID ) )
        restore_current_blog();

      // print success message
      \WP_CLI::success( $successMessage );

    } /* fetchSite() */

    /**
     * Retrieves all multisite blogs
     *
     * @return array Blog IDs as keys and blog names as values.
     */
    private function getAllSitesIDs()
    {
      $sitesIDs = array(1);

      if ( !is_multisite() )
        return $sitesIDs;

      // Query all blogs from multi-site install
      global $wpdb;
      $blogs = $wpdb->get_results("SELECT blog_id,domain,path FROM wp_blogs ORDER BY path");

      // For each blog search for blog name in respective options table
      if ( !empty( $blogs ) )
      {
        foreach( $blogs as $blog )
        {
          $sitesIDs[] = $blog->blog_id;
        }
      }

      return $sitesIDs;

    }/* getAllSitesIDs() */


  } /* Class WpCliCommand */
