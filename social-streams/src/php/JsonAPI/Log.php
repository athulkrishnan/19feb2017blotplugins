<?php

    namespace SocialStreams\JsonAPI;

    class Log
    {
        private $timer;

        public function __construct()
        {

            add_action( 'bw_api_before_run_dynamic_actions', array( $this, 'bw_api_before_run_dynamic_actions__startTimer' ), 10, 5 );

            add_filter( 'bwapi_apply_output_defaults', array( $this, 'bwapi_apply_output_defaults__addApiCallTime' ), 10, 5 );

        }

        /**
         * @internal Missing Description
         *
         * @author Alessandro Biavati <ale@briteweb.com>
         * @package briteweb/package
         * @since 1.0.0
         * @param (string) $arg - Description
         * @return (object) Description
         */

        public function bw_api_before_run_dynamic_actions__startTimer( $actions, $type, $request, $body, $callID )
        {
            $this->timer[$callID] = microtime(true);
        }



        /**
         * @internal Missing Description
         *
         * @author Alessandro Biavati <ale@briteweb.com>
         * @package briteweb/package
         * @since 1.0.0
         * @param (string) $arg - Description
         * @return (object) Description
         */

        public function bwapi_apply_output_defaults__addApiCallTime( $output, $type, $request, $body, $callID )
        {

            // $seconds = ( microtime() - $this->timer[$callID] ) / 10000000;
            // $output['time'] = $seconds;

            $output['microtime'] = microtime(true) - $this->timer[$callID];

            return $output;

        }/* bwapi_apply_output_defaults__addApiCallTime() */


    }/* class Log */
