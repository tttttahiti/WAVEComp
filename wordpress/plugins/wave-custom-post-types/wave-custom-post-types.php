<?php
/**
 * Plugin Name: WA/VE Custom Post Types
 * Description: Custom post types for WA/VE website (Works, Releases, Members)
 * Version: 1.0.0
 * Author: WA/VE
 */

if (!defined('ABSPATH')) {
    exit;
}

class WAVE_Custom_Post_Types {

    public function __construct() {
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('rest_api_init', array($this, 'register_rest_fields'));
        add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
        add_action('save_post', array($this, 'save_meta_boxes'));
    }

    /**
     * Register Custom Post Types
     */
    public function register_post_types() {
        // Works
        register_post_type('work', array(
            'labels' => array(
                'name' => 'Works',
                'singular_name' => 'Work',
                'add_new' => '新規追加',
                'add_new_item' => '新規Work追加',
                'edit_item' => 'Work編集',
                'view_item' => 'Work表示',
                'all_items' => 'すべてのWorks',
                'search_items' => 'Works検索',
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'rest_base' => 'works',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'menu_icon' => 'dashicons-portfolio',
            'rewrite' => array('slug' => 'works'),
        ));

        // Releases
        register_post_type('release', array(
            'labels' => array(
                'name' => 'Releases',
                'singular_name' => 'Release',
                'add_new' => '新規追加',
                'add_new_item' => '新規Release追加',
                'edit_item' => 'Release編集',
                'view_item' => 'Release表示',
                'all_items' => 'すべてのReleases',
                'search_items' => 'Releases検索',
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'rest_base' => 'releases',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'menu_icon' => 'dashicons-album',
            'rewrite' => array('slug' => 'releases'),
        ));

        // Members
        register_post_type('member', array(
            'labels' => array(
                'name' => 'Members',
                'singular_name' => 'Member',
                'add_new' => '新規追加',
                'add_new_item' => '新規Member追加',
                'edit_item' => 'Member編集',
                'view_item' => 'Member表示',
                'all_items' => 'すべてのMembers',
                'search_items' => 'Members検索',
            ),
            'public' => true,
            'has_archive' => false,
            'show_in_rest' => true,
            'rest_base' => 'members',
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-groups',
        ));
    }

    /**
     * Register Taxonomies
     */
    public function register_taxonomies() {
        // Work Category
        register_taxonomy('work_category', 'work', array(
            'labels' => array(
                'name' => 'Work Categories',
                'singular_name' => 'Work Category',
                'add_new_item' => '新規カテゴリー追加',
            ),
            'public' => true,
            'hierarchical' => true,
            'show_in_rest' => true,
            'rest_base' => 'work-categories',
        ));

        // Work Tags
        register_taxonomy('work_tag', 'work', array(
            'labels' => array(
                'name' => 'Work Tags',
                'singular_name' => 'Work Tag',
                'add_new_item' => '新規タグ追加',
            ),
            'public' => true,
            'hierarchical' => false,
            'show_in_rest' => true,
            'rest_base' => 'work-tags',
        ));

        // Release Type
        register_taxonomy('release_type', 'release', array(
            'labels' => array(
                'name' => 'Release Types',
                'singular_name' => 'Release Type',
            ),
            'public' => true,
            'hierarchical' => true,
            'show_in_rest' => true,
            'rest_base' => 'release-types',
        ));
    }

    /**
     * Register REST API Fields
     */
    public function register_rest_fields() {
        // Work fields
        register_rest_field('work', 'work_meta', array(
            'get_callback' => function($post) {
                return array(
                    'client' => get_post_meta($post['id'], '_work_client', true),
                    'date' => get_post_meta($post['id'], '_work_date', true),
                    'role' => get_post_meta($post['id'], '_work_role', true),
                    'url' => get_post_meta($post['id'], '_work_url', true),
                    'video_url' => get_post_meta($post['id'], '_work_video_url', true),
                    'credits' => get_post_meta($post['id'], '_work_credits', true),
                    'gallery' => get_post_meta($post['id'], '_work_gallery', true),
                    'listen_url' => get_post_meta($post['id'], '_work_listen_url', true),
                );
            },
            'schema' => array(
                'type' => 'object',
            ),
        ));

        // Release fields
        register_rest_field('release', 'release_meta', array(
            'get_callback' => function($post) {
                return array(
                    'release_date' => get_post_meta($post['id'], '_release_date', true),
                    'tracks' => get_post_meta($post['id'], '_release_tracks', true),
                    'listen_url' => get_post_meta($post['id'], '_release_listen_url', true),
                    'apple_music_url' => get_post_meta($post['id'], '_release_apple_music_url', true),
                    'spotify_url' => get_post_meta($post['id'], '_release_spotify_url', true),
                );
            },
            'schema' => array(
                'type' => 'object',
            ),
        ));

        // Member fields
        register_rest_field('member', 'member_meta', array(
            'get_callback' => function($post) {
                return array(
                    'name_en' => get_post_meta($post['id'], '_member_name_en', true),
                    'role' => get_post_meta($post['id'], '_member_role', true),
                    'achievements' => get_post_meta($post['id'], '_member_achievements', true),
                );
            },
            'schema' => array(
                'type' => 'object',
            ),
        ));

        // Featured image URL for all custom post types
        foreach (array('work', 'release', 'member') as $post_type) {
            register_rest_field($post_type, 'featured_image_url', array(
                'get_callback' => function($post) {
                    $image_id = get_post_thumbnail_id($post['id']);
                    if ($image_id) {
                        $image = wp_get_attachment_image_src($image_id, 'full');
                        return $image ? $image[0] : null;
                    }
                    return null;
                },
                'schema' => array(
                    'type' => 'string',
                ),
            ));
        }
    }

    /**
     * Add Meta Boxes
     */
    public function add_meta_boxes() {
        // Work meta box
        add_meta_box(
            'work_details',
            'Work Details',
            array($this, 'render_work_meta_box'),
            'work',
            'normal',
            'high'
        );

        // Release meta box
        add_meta_box(
            'release_details',
            'Release Details',
            array($this, 'render_release_meta_box'),
            'release',
            'normal',
            'high'
        );

        // Member meta box
        add_meta_box(
            'member_details',
            'Member Details',
            array($this, 'render_member_meta_box'),
            'member',
            'normal',
            'high'
        );
    }

    /**
     * Render Work Meta Box
     */
    public function render_work_meta_box($post) {
        wp_nonce_field('wave_work_meta', 'wave_work_meta_nonce');

        $client = get_post_meta($post->ID, '_work_client', true);
        $date = get_post_meta($post->ID, '_work_date', true);
        $role = get_post_meta($post->ID, '_work_role', true);
        $url = get_post_meta($post->ID, '_work_url', true);
        $video_url = get_post_meta($post->ID, '_work_video_url', true);
        $listen_url = get_post_meta($post->ID, '_work_listen_url', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="work_client">Client</label></th>
                <td><input type="text" id="work_client" name="work_client" value="<?php echo esc_attr($client); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_date">Date</label></th>
                <td><input type="text" id="work_date" name="work_date" value="<?php echo esc_attr($date); ?>" class="regular-text" placeholder="2025.11"></td>
            </tr>
            <tr>
                <th><label for="work_role">Role</label></th>
                <td><input type="text" id="work_role" name="work_role" value="<?php echo esc_attr($role); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_url">URL</label></th>
                <td><input type="url" id="work_url" name="work_url" value="<?php echo esc_attr($url); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_video_url">Video URL</label></th>
                <td><input type="url" id="work_video_url" name="work_video_url" value="<?php echo esc_attr($video_url); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_listen_url">Listen URL</label></th>
                <td><input type="url" id="work_listen_url" name="work_listen_url" value="<?php echo esc_attr($listen_url); ?>" class="regular-text"></td>
            </tr>
        </table>
        <?php
    }

    /**
     * Render Release Meta Box
     */
    public function render_release_meta_box($post) {
        wp_nonce_field('wave_release_meta', 'wave_release_meta_nonce');

        $release_date = get_post_meta($post->ID, '_release_date', true);
        $tracks = get_post_meta($post->ID, '_release_tracks', true);
        $listen_url = get_post_meta($post->ID, '_release_listen_url', true);
        $apple_music_url = get_post_meta($post->ID, '_release_apple_music_url', true);
        $spotify_url = get_post_meta($post->ID, '_release_spotify_url', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="release_date">Release Date</label></th>
                <td><input type="text" id="release_date" name="release_date" value="<?php echo esc_attr($release_date); ?>" class="regular-text" placeholder="2024/12/13"></td>
            </tr>
            <tr>
                <th><label for="release_tracks">Tracks (one per line)</label></th>
                <td><textarea id="release_tracks" name="release_tracks" rows="6" class="large-text"><?php echo esc_textarea($tracks); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="release_listen_url">Listen URL</label></th>
                <td><input type="url" id="release_listen_url" name="release_listen_url" value="<?php echo esc_attr($listen_url); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="release_apple_music_url">Apple Music URL</label></th>
                <td><input type="url" id="release_apple_music_url" name="release_apple_music_url" value="<?php echo esc_attr($apple_music_url); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="release_spotify_url">Spotify URL</label></th>
                <td><input type="url" id="release_spotify_url" name="release_spotify_url" value="<?php echo esc_attr($spotify_url); ?>" class="regular-text"></td>
            </tr>
        </table>
        <?php
    }

    /**
     * Render Member Meta Box
     */
    public function render_member_meta_box($post) {
        wp_nonce_field('wave_member_meta', 'wave_member_meta_nonce');

        $name_en = get_post_meta($post->ID, '_member_name_en', true);
        $role = get_post_meta($post->ID, '_member_role', true);
        $achievements = get_post_meta($post->ID, '_member_achievements', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="member_name_en">Name (English)</label></th>
                <td><input type="text" id="member_name_en" name="member_name_en" value="<?php echo esc_attr($name_en); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="member_role">Role</label></th>
                <td><input type="text" id="member_role" name="member_role" value="<?php echo esc_attr($role); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="member_achievements">Achievements (one per line)</label></th>
                <td><textarea id="member_achievements" name="member_achievements" rows="6" class="large-text"><?php echo esc_textarea($achievements); ?></textarea></td>
            </tr>
        </table>
        <?php
    }

    /**
     * Save Meta Boxes
     */
    public function save_meta_boxes($post_id) {
        // Work meta
        if (isset($_POST['wave_work_meta_nonce']) && wp_verify_nonce($_POST['wave_work_meta_nonce'], 'wave_work_meta')) {
            $fields = array('work_client', 'work_date', 'work_role', 'work_url', 'work_video_url', 'work_listen_url');
            foreach ($fields as $field) {
                if (isset($_POST[$field])) {
                    update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
                }
            }
        }

        // Release meta
        if (isset($_POST['wave_release_meta_nonce']) && wp_verify_nonce($_POST['wave_release_meta_nonce'], 'wave_release_meta')) {
            $fields = array('release_date', 'release_tracks', 'release_listen_url', 'release_apple_music_url', 'release_spotify_url');
            foreach ($fields as $field) {
                if (isset($_POST[$field])) {
                    $value = $field === 'release_tracks' ? sanitize_textarea_field($_POST[$field]) : sanitize_text_field($_POST[$field]);
                    update_post_meta($post_id, '_' . $field, $value);
                }
            }
        }

        // Member meta
        if (isset($_POST['wave_member_meta_nonce']) && wp_verify_nonce($_POST['wave_member_meta_nonce'], 'wave_member_meta')) {
            $fields = array('member_name_en', 'member_role', 'member_achievements');
            foreach ($fields as $field) {
                if (isset($_POST[$field])) {
                    $value = $field === 'member_achievements' ? sanitize_textarea_field($_POST[$field]) : sanitize_text_field($_POST[$field]);
                    update_post_meta($post_id, '_' . $field, $value);
                }
            }
        }
    }
}

// Initialize
new WAVE_Custom_Post_Types();

// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
}, 15);
