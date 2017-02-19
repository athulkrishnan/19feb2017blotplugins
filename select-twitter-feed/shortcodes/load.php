<?php
$twitterShortcode = new SelectTwitterShortcode();
add_shortcode($twitterShortcode->getBase(), array($twitterShortcode, 'render'));