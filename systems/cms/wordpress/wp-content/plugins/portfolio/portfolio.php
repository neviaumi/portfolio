<?php
/*
* Plugin Name: App_Portfolio
* Description: This plugin provides functionality to showcase portfolios such as Skills, Experiences, Recommendations, etc.
*/

namespace App\Portfolio;

if (!defined('ABSPATH')) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
function activate()
{
    error_log('Plugin has been activated');
    flush_rewrite_rules();
}

register_activation_hook(
    __FILE__,
    'App\Portfolio\activate'
);

function deactivate()
{
    error_log('Plugin has been deactivated');
    flush_rewrite_rules();
}

register_deactivation_hook(__FILE__, 'App\Portfolio\deactivate');

// Function to add the meta box
function add_summary_meta_boxes()
{
    add_meta_box(
        'summary_details',           // Unique ID for the meta box
        __('Summary Details', 'app_portfolio'), // Box title
        'App\Portfolio\render_summary_meta_box',   // Callback function to render the box content
        'summary',                   // Post type
        'normal',                    // Context (normal, side, etc.)
        'default'                    // Priority
    );
}

// Callback function to render the meta box content
function render_summary_meta_box($post)
{
    // Add a nonce field for security
    wp_nonce_field('save_summary_meta_box_data', 'summary_meta_box_nonce');

    // Retrieve an existing value from the database
    $value = get_post_meta($post->ID, '_summary_meta_key', true);

    // Display the form field
    echo '<label for="summary_field">';
    _e('Summary Field', 'app_portfolio');
    echo '</label> ';
    echo '<input type="text" id="summary_field" name="summary_field" value="' . esc_attr($value) . '" size="25" />';
}

// Save the meta box data when the post is saved
function save_summary_meta_box_data($post_id)
{
    // Check if our nonce is set.
    if (!isset($_POST['summary_meta_box_nonce'])) {
        return;
    }

    // Verify that the nonce is valid.
    if (!wp_verify_nonce($_POST['summary_meta_box_nonce'], 'save_summary_meta_box_data')) {
        return;
    }

    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check the user's permissions.
    if (isset($_POST['post_type']) && 'summary' == $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Sanitize and save the data
    if (isset($_POST['summary_field'])) {
        $my_data = sanitize_text_field($_POST['summary_field']);
        update_post_meta($post_id, '_summary_meta_key', $my_data);
    }
}

function register_summary_post_type()
{
    $labels = array(
        'name' => 'Summaries',
        'singular_name' => 'Summary',
        'menu_name' => 'Summaries',
        'name_admin_bar' => 'Summary',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Summary',
        'new_item' => 'New Summary',
        'edit_item' => 'Edit Summary',
        'view_item' => 'View Summary',
        'all_items' => 'All Summaries',
        'search_items' => 'Search Summaries',
        'parent_item_colon' => 'Parent Summaries:',
        'not_found' => 'No summaries found.',
        'not_found_in_trash' => 'No summaries found in Trash.'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'summary'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'show_in_rest' => true,
        'supports' => array('custom-fields', 'title'),
        'register_meta_box_cb' => 'App\Portfolio\add_summary_meta_boxes'
    );
    register_post_type('summary', $args);
}

add_action('init', 'App\Portfolio\register_summary_post_type');
error_log('Plugin has been running');
add_action('save_post', 'App\Portfolio\save_summary_meta_box_data');

function add_summary_meta_to_rest_api()
{
    register_rest_field(
        'summary',
        'summary_meta',
        array(
            'get_callback' => function ($post_arr) {
                $meta_value = get_post_meta($post_arr['id'], '_summary_meta_key', true);
                return $meta_value;
            },
            'schema' => array(
                'description' => __('Summary Meta Field'),
                'type' => 'string',
            ),
        )
    );
    register_rest_field(
        'summary',
        'customFields',
        array(
            'get_callback' => function ($post_arr) {
                $meta_value = get_post_meta($post_arr['id']);
                return $meta_value;
            },
            'schema' => array(
                'description' => __('Summary Custom Fields'),
                'type' => 'object',
            ),
        )
    );
}

add_action('rest_api_init', 'App\Portfolio\add_summary_meta_to_rest_api');