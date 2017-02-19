<?php
/**
 * Template of table in Product Page
 *
 * @author  Yithemes
 * @package YITH Product Size Charts for WooCommerce
 * @version 1.0.0
 */

if ( !defined( 'YITH_WCPSC' ) ) {
    exit;
} // Exit if accessed directly

/*
 * $table_meta -> content of the table
 * $c_id -> the id of the Product Size Chart post
 */

$t        = json_decode( $table_meta );
$c        = get_post( $c_id );
$is_popup = isset( $is_popup ) && $is_popup;

if ( $is_popup ) {
    $popup_type        = get_post_meta( $c_id, 'display_as', true );
    $description_title = get_post_meta( $c_id, 'title_of_desc_tab', true );

    $p_style           = get_option( 'yith-wcpsc-popup-style', 'default' );
    $popup_style_class = 'yith-wcpsc-product-size-charts-popup-' . $p_style;
    echo "<div id='yith-wcpsc-product-size-charts-popup-{$c->ID}' class='yith-wcpsc-product-size-charts-popup {$popup_style_class}'>";
    echo "<span class='yith-wcpsc-product-size-charts-popup-close yith-wcpsc-popup-close dashicons dashicons-no-alt'></span>";
    echo "<div class='yith-wcpsc-product-size-charts-popup-container'>";
    //if ( $popup_type != 'tabbed_popup' )
    echo "<h2>{$c->post_title}</h2>";
}
$tabbed_class = '';
if ( $is_popup && $popup_type == 'tabbed_popup' ) {
    $tabbed_class = ' yith-wcpsc-product-table-wrapper-tabbed-popup';
}
$t_style           = get_option( 'yith-wcpsc-table-style', 'default' );
$table_style_class = 'yith-wcpsc-product-table-' . $t_style;
?>

<div class="yith-wcpsc-product-table-wrapper<?php echo $tabbed_class; ?>">
    <?php if ( $is_popup && $popup_type == 'tabbed_popup' ) {
        echo "<ul class='yith-wcpsc-tabbed-popup-list'>
                <li><a href='#yith-wcpsc-tab-chart-$c_id'>$c->post_title</a></li>
                <li><a href='#yith-wcpsc-tab-desc-$c_id'>$description_title</a></li>
              </ul>
              <div id='yith-wcpsc-tab-desc-$c_id'>";
    }
    $content = $c->post_content;
    $content = apply_filters( 'the_content', $content );
    $content = str_replace( ']]>', ']]&gt;', $content );
    ?>

    <?php echo $content; ?>

    <?php if ( $is_popup && $popup_type == 'tabbed_popup' ) {
        echo "</div>
              <div id='yith-wcpsc-tab-chart-$c_id'>";
    }
    ?>
    <div class="yith-wcpsc-product-table-responsive-container">
        <table class="yith-wcpsc-product-table <?php echo $table_style_class; ?>">
            <thead>
            <tr>
                <?php foreach ( $t[ 0 ] as $col ): ?>
                    <th>
                        <?php echo $col; ?>
                    </th>
                <?php endforeach; ?>
            </tr>
            </thead>

            <tbody>
            <?php foreach ( $t as $idx => $row ): ?>
                <?php if ( $idx == 0 )
                    continue; ?>
                <tr>
                    <?php foreach ( $row as $col ): ?>
                        <td>
                            <div class="yith-wcpsc-product-table-td-content">
                                <?php echo str_replace( '"', '&quot;', $col ) ?>
                            </div>
                        </td>
                    <?php endforeach; ?>
                </tr>
            <?php endforeach; ?>

            </tbody>
        </table>
    </div>
    <?php if ( $is_popup && $popup_type == 'tabbed_popup' ) {
        echo "</div>";
    }
    ?>
</div>

<?php
if ( $is_popup ) {
    echo '</div>';
    echo '</div>';
}
?>


