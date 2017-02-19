jQuery( function ( $ ) {
    $( '.yith-chosen' ).chosen( { width: '100%' } );

    var table_style_sel  = $( '#yith-wcpsc-table-style' ),
        table_base_color = $( '#yith-wcpsc-table-base-color' ),
        table_colors     = {
            default: '#f9f9f9',
            informal: '#ffd200',
            casual: '#b37c81',
            elegant: '#000000'
        },
        popup_style_sel  = $( '#yith-wcpsc-popup-style' ),
        popup_base_color = $( '#yith-wcpsc-popup-base-color' ),
        popup_colors     = {
            default: '#ffffff',
            informal: '#999999',
            casual: '#b37c81',
            elegant: '#6d6d6d'
        };


    table_style_sel.on( 'change', function () {
        var selected = table_style_sel.children( ':selected' ).val(),
            color    = table_colors[ selected ];

        table_base_color.val( color );
        table_base_color.trigger('keyup');
    } );

    popup_style_sel.on( 'change', function () {
        var selected = popup_style_sel.children( ':selected' ).val(),
            color    = popup_colors[ selected ];

        popup_base_color.val( color );
        popup_base_color.trigger('keyup');
    } );

} );