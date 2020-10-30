<?php
/*
   Plugin Name: Books Library
   description: A plugin that use for Collactions of books.
   Version: 1.0
   Author: Rohit Gupta
   Author URI: http://rohitgupta.design
   License: GPL2
   */


require_once( plugin_dir_path( __FILE__ ) . '/inc/endpoints.php' );

/*
 * enqueue app-build.js START
 */
add_action('wp_enqueue_scripts', 'books_front_scripts');

function books_front_scripts()
{
    // enqueue books in front
    wp_enqueue_script('books-library-app-build-js',  plugins_url( '/app/app.build.js', __FILE__ ), ['wp-blocks'], null, true);

    // enqueue style.css in front
    wp_enqueue_style( 'books-library-style-css', plugins_url( '/assets/css/style.css', __FILE__ )  );

    // enqueue media.css in front
    wp_enqueue_style( 'books-library-media-css', plugins_url( '/assets/css/media.css', __FILE__ )  );
}

function books_backend_scripts()
{
    // enqueue blocks
    wp_register_script(
        'book_library_block',
        plugins_url( '/blocks/block.build.js', __FILE__ ),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components')
    );
    // enqueue style.css in backend
    wp_enqueue_style( 'books-library-backend-style-css', plugins_url( '/assets/css/style.css', __FILE__ )  );

    register_block_type('book/blocks', array(
        'editor_script' => 'book_library_block',
        'editor_style'  => 'book_library_block',
    ));
}

add_action('enqueue_block_editor_assets', 'books_backend_scripts');

/*
 * enqueue app-build.js END
 */


 /*
 * Create books custom post_type
 */
function books_custom_post_type(){
    $labels = array(
        'name'                => __('Books Library'),
        'singular_name'       => __('Book Library'),
        'menu_name'           => __('Books Library'),
        'all_items'           => __('All Books'),
        'view_item'           => __('View Book'),
        'add_new_item'        => __('Add New Book'),
        'add_new'             => __('Add New'),
        'edit_item'           => __('Edit Book'),
        'update_item'         => __('Update Book'),
        'search_items'        => __('Search Book'),
        'not_found'           => __('Not Found'),
        'not_found_in_trash'  => __('Not found in Trash')
    );
    $args = array(
        'label'               => __('books'),
        'description'         => __('Book Selection'),
        'labels'              => $labels,
        'supports'            => array('title', 'editor', 'thumbnail', 'revisions'),
        'public'              => false,
        'hierarchical'        => false,
        'menu_icon'           => 'dashicons-book-alt',
        'show_ui'             => true,
        'has_archive'         => true,
        'can_export'          => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page'
    );

    register_post_type('books', $args);

    register_taxonomy(
        'book_author',
        'books',
        array(
                'labels'        => array(
                'name'          => 'Author',
                'add_new_item'  => 'Add New Author',
                'new_item_name' => "New Author Type"
            ),
            'show_ui'           => true,
            'show_tagcloud'     => false,
            'hierarchical'      => true
        )
    );

    register_taxonomy(
        'book_publisher',
        'books',
        array(
                'labels'        => array(
                'name'          => 'Publisher',
                'add_new_item'  => 'Add New Publisher',
                'new_item_name' => "New Publisher Type"
            ),
            'show_ui'           => true,
            'show_tagcloud'     => false,
            'hierarchical'      => true
        )
    );
}
add_action('init', 'books_custom_post_type', 0);


/**
 * Custome Meta box.
 */
function books_register_meta_boxes() {
    add_meta_box( 'books_meta', __( 'Additional Details', 'bp' ), 'books_display_callback', 'books' );
}

add_action( 'add_meta_boxes', 'books_register_meta_boxes' );

/**
 * Meta box display callback.
 *
 * @param WP_Post $post Current post object.
 */
function books_display_callback( $post ) {
    include plugin_dir_path( __FILE__ ) . '/inc/books_meta.php';
}

function books_save_meta_box( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( $parent_id = wp_is_post_revision( $post_id ) ) {
        $post_id = $parent_id;
    }
    $fields = [
        'books_rating',
        'book_price',
        'book_link',
    ];
    foreach ( $fields as $field ) {
        if ( array_key_exists( $field, $_POST  ) ) {
            update_post_meta( $post_id, $field, sanitize_text_field( $_POST[$field] ) );
        }
     }
}
add_action( 'save_post', 'books_save_meta_box' );
