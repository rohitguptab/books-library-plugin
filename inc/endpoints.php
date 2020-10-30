<?php

/**
 * This file contains all the custom rest API endpoints and callback functions.
 *
 * @package books-library
 */


add_action('rest_api_init', 'books_list_rest_apis');

function books_list_rest_apis()
{
    /**
     * books Data endpoint
     */
    register_rest_route('books_library', '/v1/books', [
        'methods'  => 'GET',
        'callback' => 'bookFunction',
        'permission_callback' => '__return_true',
    ]);

    /**
     * book_filter endpoint
    **/
    register_rest_route('books_library', '/v1/book_filter', [
        'methods'  => 'GET',
        'callback' => 'bookAuthorFunction',
        'permission_callback' => '__return_true',
    ]);
}

/**
 * bookAuthorFunction function for book_filter
 */
function bookAuthorFunction(WP_REST_Request $request){
    $author_terms_data     = [];
    $publisher_terms_data  = [];
    $response               = [];

    $author_terms = get_terms('book_author', [
        'orderby'    => 'name',
        'order'      => 'ASC',
        'fields'     => 'id=>name',
        'hide_empty' => true,
    ]);
    $i           = 0;
    if (!empty($author_terms)) {
        foreach ($author_terms as $key => $author_term) {
            $author_terms_data[$i]['id']   = $key;
            $author_terms_data[$i]['name'] = html_entity_decode($author_term);
            $i++;
        }
        $response['status'] = true;
    } else {
        $response['status'] = false;
    }

    $publisher_terms = get_terms('book_publisher', [
        'orderby'    => 'name',
        'order'      => 'ASC',
        'fields'     => 'id=>name',
        'hide_empty' => true,
    ]);
    $i           = 0;
    if (!empty($publisher_terms)) {
        foreach ($publisher_terms as $key => $publisher_term) {
            $publisher_terms_data[$i]['id']   = $key;
            $publisher_terms_data[$i]['name'] = html_entity_decode($publisher_term);
            $i++;
        }
        $response['status'] = true;
    } else {
        $response['status'] = false;
    }

    $response['author']      = $author_terms_data;
    $response['publisher']   = $publisher_terms_data;

    return new WP_REST_Response($response, 200);
};

/**
 * bookFunction function for books Data
 */
function bookFunction(WP_REST_Request $request){
    $parameters    = $request->get_params();
    $searchQuery   = !empty($parameters['search']) ? $parameters['search'] : '';
    $author        = !empty($parameters['a']) ? $parameters['a'] : '';
    $publisher     = !empty($parameters['p']) ? $parameters['p'] : '';
    $paged         = !empty($parameters['paged']) ? $parameters['paged'] : 1;
    $rating        = !empty($parameters['rating']) ? $parameters['rating'] : '';
    $min           = !empty($parameters['min']) ? $parameters['min'] : '';
    $max           = !empty($parameters['max']) ? $parameters['max'] : '';
    $query_data    = [];
    $response      = [];

    $query_args = [
        'post_type'      => 'books',
        'post_status'    => 'publish',
        'orderby'        => 'DATE',
        's'              => $searchQuery,
        'paged'          => $paged,
        'posts_per_page' => 8,
    ];

    // meta_query of rating and price
    $query_args['meta_query'] = array();
    $rating ? array_push($query_args['meta_query'], array('key' => 'books_rating', 'value' => $rating, 'type' => 'numeric') ) : null ;
    $min && $max  ? array_push($query_args['meta_query'], array('key' => 'book_price', 'value' => array( $min, $max ), 'type' => 'numeric', 'compare' => 'BETWEEN') ) : null ;
    $min && !$max  ? array_push($query_args['meta_query'], array('key' => 'book_price', 'value' => $min, 'type' => 'numeric', 'compare' => '>') ) : null ;
    $max && !$min  ? array_push($query_args['meta_query'], array('key' => 'book_price', 'value' => $max, 'type' => 'numeric', 'compare' => '<') ) : null ;
    
    // tax_query of author and publisher
    $query_args['tax_query'] = array();
    $author ? array_push($query_args['tax_query'], array('taxonomy' => 'book_author', 'field' => 'book_author', 'terms' => $author) ) : null ;
    $publisher ? array_push($query_args['tax_query'], array('taxonomy' => 'book_publisher', 'field' => 'book_publisher', 'terms' => $publisher) ) : null ;

    $query_data_list = new WP_Query($query_args);
    $all_data = $query_data_list->posts;
    $i               = 0;

    if (!empty($all_data)) {
        foreach ($all_data as $book_item) {
            $key = $i;
            $author_data = [];
            $i1              = 0;
            if (!empty(get_the_terms($book_item->ID, 'book_author'))) {
                foreach (get_the_terms($book_item->ID, 'book_author') as $cd) {
                    $key1 = $i1;
                    $author_data[$key1]['id']    = $cd->term_id;
                    $author_data[$key1]['name']  = $cd->name;
                    $author_data[$key1]['slug']  = $cd->slug;
                    $i1++;
                }
            }
            $publisher_data = [];
            $i1              = 0;

            if (!empty(get_the_terms($book_item->ID, 'book_publisher'))) {
                foreach (get_the_terms($book_item->ID, 'book_publisher') as $cd) {
                    $key1 = $i1;
                    $publisher_data[$key1]['id']    = $cd->term_id;
                    $publisher_data[$key1]['name']  = $cd->name;
                    $publisher_data[$key1]['slug']  = $cd->slug;
                    $i1++;
                }
            }

            $query_data[$key]['id']           = $book_item->ID;
            $query_data[$key]['image']        = wp_get_attachment_url(get_post_thumbnail_id($book_item->ID));
            $query_data[$key]['title']        = $book_item->post_title;
            $query_data[$key]['description']  = substr($book_item->post_content, 0, 580);
            $query_data[$key]['price']        = get_post_meta($book_item->ID, 'book_price', true);
            $query_data[$key]['rating']       = get_post_meta($book_item->ID, 'books_rating', true);
            $query_data[$key]['link']         = get_post_meta($book_item->ID, 'book_link', true);
            $query_data[$key]['author']       = $author_data;
            $query_data[$key]['publisher']    = $publisher_data;
            $query_data[$key]['Rohit Gupta']  = $rating;

            $i++;
        }
        $response['status']      = true;
        $response['total_post']  = $query_data_list->found_posts;
    } else {
        $response['status']      = false;
    }

    $response['data'] = $query_data;

    return new WP_REST_Response($response);
}
