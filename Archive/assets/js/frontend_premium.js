jQuery( function ( $ ) {
    // this code support AJAX page loading
    $( document ).on( 'click', '.yith-wcpsc-product-size-chart-button, .yith-wcpsc-product-size-chart-list', function () {
        var c_id      = $( this ).data( 'chart-id' ),
            my_popup  = $( '#yith-wcpsc-product-size-charts-popup-' + c_id ),
            all_popup = $( '.yith-wcpsc-product-size-charts-popup' );

        // set max height of table wrapper to allow scrolling
        $( '.yith-wcpsc-product-table-wrapper' ).css( 'max-height', ($( window ).height() - 80) + 'px' );

        all_popup.each( function () {
            $( this ).yith_wcpsc_popup( 'close' );
        } );

        my_popup.find( '.yith-wcpsc-product-table-wrapper-tabbed-popup' ).tabs();

        var created_popup = my_popup.yith_wcpsc_popup( {
            position: ajax_object.popup_position,
            effect: ajax_object.popup_effect
        } );
        created_popup.find( '.yith-wcpsc-product-table-wrapper-tabbed-popup' ).tabs();
    } );

    // set max height of table wrapper to allow scrolling
    $( '.yith-wcpsc-product-table-wrapper' ).css( 'max-height', ($( window ).height() - 80) + 'px' );
} );
