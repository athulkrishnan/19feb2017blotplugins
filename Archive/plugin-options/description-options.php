<?php
// Exit if accessed directly
! defined( 'YITH_WCPSC' )  && exit();

$description = __( 'YITH Product Size Charts for WooCommerce allows you to create custom size charts. Go to ', 'yith-product-size-charts-for-woocommerce');
$description .= '<a href="edit.php?post_type=yith-wcpsc-wc-chart">';
$description .= __( 'Size Charts', 'yith-product-size-charts-for-woocommerce');
$description .= '</a>';
$description .= __( '. Add your Size Chart and assign it to a product. It will be visible on detail page of the selected product', 'yith-product-size-charts-for-woocommerce');

$tab = array(
    'description' => array(
        'tab-title' => array(
            'title' => _x( 'Product Size Charts', 'Admin:title of field description in description-tab', 'yith-product-size-charts-for-woocommerce' ),
            'type' => 'title',
            'desc' => $description,
            'id' => 'yith-wcpsc-tab-title'
        )
    )
);

return apply_filters( 'yith_wcpsc_panel_description_options', $tab );