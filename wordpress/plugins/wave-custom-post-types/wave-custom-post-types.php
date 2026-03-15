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
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));

        // カスタム投稿タイプでクラシックエディターを使用（メタボックス表示のため）
        add_filter('use_block_editor_for_post_type', array($this, 'disable_gutenberg_for_custom_types'), 10, 2);
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        global $post_type;
        if (($hook === 'post.php' || $hook === 'post-new.php') && $post_type === 'work') {
            wp_enqueue_script('jquery-ui-sortable');
        }
    }

    /**
     * カスタム投稿タイプでGutenbergを無効化
     */
    public function disable_gutenberg_for_custom_types($use_block_editor, $post_type) {
        if (in_array($post_type, array('work', 'release', 'member'))) {
            return false;
        }
        return $use_block_editor;
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
            'taxonomies' => array('work_category', 'work_tag'),
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
            'taxonomies' => array('release_type', 'release_tag'),
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
            'show_in_menu' => true,
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

        // Release Tags
        register_taxonomy('release_tag', 'release', array(
            'labels' => array(
                'name' => 'Release Tags',
                'singular_name' => 'Release Tag',
                'add_new_item' => '新規タグ追加',
            ),
            'public' => true,
            'hierarchical' => false,
            'show_in_rest' => true,
            'rest_base' => 'release-tags',
        ));
    }

    /**
     * Register REST API Fields
     */
    public function register_rest_fields() {
        // Work fields
        register_rest_field('work', 'work_meta', array(
            'get_callback' => function($post) {
                // Audio file
                $audio_id = get_post_meta($post['id'], '_work_audio_file', true);
                $audio_url = null;
                if ($audio_id) {
                    $audio_url = wp_get_attachment_url($audio_id);
                }

                // Video URLs (multiple, newline separated)
                $video_urls_raw = get_post_meta($post['id'], '_work_video_urls', true);
                $video_urls = array_filter(array_map('trim', explode("\n", $video_urls_raw)));

                // Gallery images (multiple IDs, comma separated)
                $gallery_ids_raw = get_post_meta($post['id'], '_work_gallery_images', true);
                $gallery_images = array();
                if ($gallery_ids_raw) {
                    $ids = array_filter(array_map('intval', explode(',', $gallery_ids_raw)));
                    foreach ($ids as $id) {
                        $image = wp_get_attachment_image_src($id, 'full');
                        $thumb = wp_get_attachment_image_src($id, 'medium');
                        if ($image) {
                            $gallery_images[] = array(
                                'id' => $id,
                                'url' => $image[0],
                                'width' => $image[1],
                                'height' => $image[2],
                                'thumbnail' => $thumb ? $thumb[0] : $image[0],
                            );
                        }
                    }
                }

                // Layout order (default: video, content, gallery, audio)
                $layout_order_raw = get_post_meta($post['id'], '_work_layout_order', true);
                $layout_order = $layout_order_raw ? array_map('trim', explode(',', $layout_order_raw)) : array('video', 'content', 'gallery', 'audio');

                // Display order
                $display_order = get_post_meta($post['id'], '_work_display_order', true);

                // Gallery settings
                $gallery_columns_desktop = get_post_meta($post['id'], '_work_gallery_columns_desktop', true);
                $gallery_columns_mobile = get_post_meta($post['id'], '_work_gallery_columns_mobile', true);
                $gallery_gutter = get_post_meta($post['id'], '_work_gallery_gutter', true);

                // Featured flags
                $featured = get_post_meta($post['id'], '_work_featured', true);
                $featured_order = get_post_meta($post['id'], '_work_featured_order', true);
                $featured_halca = get_post_meta($post['id'], '_work_featured_halca', true);
                $featured_halca_order = get_post_meta($post['id'], '_work_featured_halca_order', true);

                return array(
                    'client' => get_post_meta($post['id'], '_work_client', true),
                    'date' => get_post_meta($post['id'], '_work_date', true),
                    'role' => get_post_meta($post['id'], '_work_role', true),
                    'role_en' => get_post_meta($post['id'], '_work_role_en', true),
                    'url' => get_post_meta($post['id'], '_work_url', true),
                    'video_urls' => $video_urls,
                    'credits' => get_post_meta($post['id'], '_work_credits', true),
                    'audio_url' => $audio_url,
                    'gallery_images' => $gallery_images,
                    'gallery_columns_desktop' => $gallery_columns_desktop ? intval($gallery_columns_desktop) : null,
                    'gallery_columns_mobile' => $gallery_columns_mobile ? intval($gallery_columns_mobile) : null,
                    'gallery_gutter' => $gallery_gutter !== '' ? intval($gallery_gutter) : null,
                    'layout_order' => $layout_order,
                    'display_order' => $display_order ? intval($display_order) : 99,
                    'featured' => !empty($featured),
                    'featured_order' => $featured_order ? intval($featured_order) : 99,
                    'featured_halca' => !empty($featured_halca),
                    'featured_halca_order' => $featured_halca_order ? intval($featured_halca_order) : 99,
                );
            },
            'schema' => array(
                'type' => 'object',
            ),
        ));

        // Release fields
        register_rest_field('release', 'release_meta', array(
            'get_callback' => function($post) {
                $display_order = get_post_meta($post['id'], '_release_display_order', true);
                $featured = get_post_meta($post['id'], '_release_featured', true);
                $featured_order = get_post_meta($post['id'], '_release_featured_order', true);
                $featured_halca = get_post_meta($post['id'], '_release_featured_halca', true);
                $featured_halca_order = get_post_meta($post['id'], '_release_featured_halca_order', true);
                return array(
                    'release_date' => get_post_meta($post['id'], '_release_date', true),
                    'tracks' => get_post_meta($post['id'], '_release_tracks', true),
                    'listen_url' => get_post_meta($post['id'], '_release_listen_url', true),
                    'apple_music_url' => get_post_meta($post['id'], '_release_apple_music_url', true),
                    'spotify_url' => get_post_meta($post['id'], '_release_spotify_url', true),
                    'display_order' => $display_order ? intval($display_order) : 99,
                    'featured' => !empty($featured),
                    'featured_order' => $featured_order ? intval($featured_order) : 99,
                    'featured_halca' => !empty($featured_halca),
                    'featured_halca_order' => $featured_halca_order ? intval($featured_halca_order) : 99,
                    'release_type_label' => get_post_meta($post['id'], '_release_type_label', true),
                );
            },
            'schema' => array(
                'type' => 'object',
            ),
        ));

        // Member fields
        register_rest_field('member', 'member_meta', array(
            'get_callback' => function($post) {
                $mobile_image_id = get_post_meta($post['id'], '_member_mobile_image', true);
                $mobile_image_url = null;
                if ($mobile_image_id) {
                    $image = wp_get_attachment_image_src($mobile_image_id, 'full');
                    $mobile_image_url = $image ? $image[0] : null;
                }
                $display_order = get_post_meta($post['id'], '_member_display_order', true);
                return array(
                    'name_en' => get_post_meta($post['id'], '_member_name_en', true),
                    'role' => get_post_meta($post['id'], '_member_role', true),
                    'achievements' => get_post_meta($post['id'], '_member_achievements', true),
                    'mobile_image_url' => $mobile_image_url,
                    'display_order' => $display_order ? intval($display_order) : 99,
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

        // Work tags (タクソノミーのterm情報を含む)
        register_rest_field('work', 'work_tags_data', array(
            'get_callback' => function($post) {
                $terms = wp_get_post_terms($post['id'], 'work_tag', array('fields' => 'all'));
                if (is_wp_error($terms) || empty($terms)) {
                    return array();
                }
                return array_map(function($term) {
                    return array(
                        'id' => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug,
                    );
                }, $terms);
            },
            'schema' => array(
                'type' => 'array',
            ),
        ));

        // Release tags (タクソノミーのterm情報を含む)
        register_rest_field('release', 'release_tags_data', array(
            'get_callback' => function($post) {
                $terms = wp_get_post_terms($post['id'], 'release_tag', array('fields' => 'all'));
                if (is_wp_error($terms) || empty($terms)) {
                    return array();
                }
                return array_map(function($term) {
                    return array(
                        'id' => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug,
                    );
                }, $terms);
            },
            'schema' => array(
                'type' => 'array',
            ),
        ));
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

        $display_order = get_post_meta($post->ID, '_work_display_order', true);
        $featured = get_post_meta($post->ID, '_work_featured', true);
        $featured_order = get_post_meta($post->ID, '_work_featured_order', true);
        $featured_halca = get_post_meta($post->ID, '_work_featured_halca', true);
        $featured_halca_order = get_post_meta($post->ID, '_work_featured_halca_order', true);
        $client = get_post_meta($post->ID, '_work_client', true);
        $date = get_post_meta($post->ID, '_work_date', true);
        $role = get_post_meta($post->ID, '_work_role', true);
        $url = get_post_meta($post->ID, '_work_url', true);
        $video_urls = get_post_meta($post->ID, '_work_video_urls', true);
        $audio_file_id = get_post_meta($post->ID, '_work_audio_file', true);
        $audio_file_url = $audio_file_id ? wp_get_attachment_url($audio_file_id) : '';
        $gallery_ids = get_post_meta($post->ID, '_work_gallery_images', true);
        $layout_order = get_post_meta($post->ID, '_work_layout_order', true);
        if (!$layout_order) {
            $layout_order = 'video,content,gallery,audio';
        }
        $credits = get_post_meta($post->ID, '_work_credits', true);
        if (!$credits) {
            $credits = '';
        }
        ?>
        <style>
            .gallery-preview { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }
            .gallery-preview img { max-width: 100px; height: auto; border: 1px solid #ddd; }
            .gallery-item { position: relative; }
            .gallery-item .remove-image { position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px; line-height: 1; }
            .layout-order-list { max-width: 300px; }
            .layout-item { background: #f0f0f1; border: 1px solid #c3c4c7; padding: 10px 12px; margin-bottom: 4px; cursor: move; display: flex; align-items: center; gap: 8px; }
            .layout-item:hover { background: #e0e0e0; }
            .layout-item .dashicons { color: #787c82; }
            .layout-item.ui-sortable-helper { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
            .layout-item.ui-sortable-placeholder { visibility: visible !important; background: #ddd; border: 1px dashed #999; }
        </style>
        <table class="form-table">
            <tr>
                <th><label for="work_display_order">表示順</label></th>
                <td>
                    <input type="number" id="work_display_order" name="work_display_order" value="<?php echo esc_attr($display_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">小さい数字が先に表示されます（例: 1, 2, 3...）</p>
                </td>
            </tr>
            <tr>
                <th>FEATURED（TOP）</th>
                <td>
                    <label><input type="checkbox" name="work_featured" value="1" <?php checked($featured, '1'); ?>> TOPページのFEATUREDに表示する</label>
                    <br><br>
                    <label for="work_featured_order">FEATURED表示順:</label>
                    <input type="number" id="work_featured_order" name="work_featured_order" value="<?php echo esc_attr($featured_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">FEATURED内での表示順（小さい数字が先）</p>
                </td>
            </tr>
            <tr>
                <th>FEATURED（HAL ca）</th>
                <td>
                    <label><input type="checkbox" name="work_featured_halca" value="1" <?php checked($featured_halca, '1'); ?>> HAL caページのFEATUREDに表示する</label>
                    <br><br>
                    <label for="work_featured_halca_order">FEATURED表示順:</label>
                    <input type="number" id="work_featured_halca_order" name="work_featured_halca_order" value="<?php echo esc_attr($featured_halca_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">HAL ca FEATURED内での表示順（小さい数字が先）</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_client">Client</label></th>
                <td><input type="text" id="work_client" name="work_client" value="<?php echo esc_attr($client); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_date">Date</label></th>
                <td><input type="text" id="work_date" name="work_date" value="<?php echo esc_attr($date); ?>" class="regular-text" placeholder="2025.11"></td>
            </tr>
            <tr>
                <th><label for="work_role">Role（日本語）</label></th>
                <td>
                    <input type="text" id="work_role" name="work_role" value="<?php echo esc_attr($role); ?>" class="regular-text">
                    <p class="description">個別WORKSページ内に表示されます</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_role_en">Role（EN）</label></th>
                <td>
                    <input type="text" id="work_role_en" name="work_role_en" value="<?php echo esc_attr(get_post_meta($post->ID, '_work_role_en', true)); ?>" class="regular-text">
                    <p class="description">サムネ下に表示されます（例: Sound Design, Event Produce）</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_url">URL</label></th>
                <td><input type="url" id="work_url" name="work_url" value="<?php echo esc_attr($url); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="work_video_urls">Video URLs</label></th>
                <td>
                    <textarea id="work_video_urls" name="work_video_urls" rows="4" class="large-text"><?php echo esc_textarea($video_urls); ?></textarea>
                    <p class="description">1行に1つのURL（YouTube, Vimeo等）</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_audio_file">Audio File</label></th>
                <td>
                    <input type="hidden" id="work_audio_file" name="work_audio_file" value="<?php echo esc_attr($audio_file_id); ?>">
                    <div id="audio_preview" style="margin-bottom: 10px;">
                        <?php if ($audio_file_url): ?>
                            <audio controls src="<?php echo esc_url($audio_file_url); ?>" style="max-width: 300px;"></audio>
                        <?php endif; ?>
                    </div>
                    <button type="button" class="button" id="upload_audio_button">Select Audio</button>
                    <button type="button" class="button" id="remove_audio_button" <?php echo $audio_file_id ? '' : 'style="display:none;"'; ?>>Remove</button>
                    <p class="description">音声ファイル（MP3, WAV等）をアップロード</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_gallery_images">Gallery Images</label></th>
                <td>
                    <input type="hidden" id="work_gallery_images" name="work_gallery_images" value="<?php echo esc_attr($gallery_ids); ?>">
                    <div id="gallery_preview" class="gallery-preview">
                        <?php
                        if ($gallery_ids) {
                            $ids = array_filter(array_map('intval', explode(',', $gallery_ids)));
                            foreach ($ids as $id) {
                                $thumb = wp_get_attachment_image_url($id, 'thumbnail');
                                if ($thumb) {
                                    echo '<div class="gallery-item" data-id="' . $id . '"><img src="' . esc_url($thumb) . '"><button type="button" class="remove-image">&times;</button></div>';
                                }
                            }
                        }
                        ?>
                    </div>
                    <button type="button" class="button" id="add_gallery_images_button">Add Images</button>
                    <p class="description">ギャラリーに表示する画像を選択（複数選択可）</p>
                </td>
            </tr>
            <tr>
                <th><label>Gallery Settings</label></th>
                <td>
                    <?php
                    $gallery_columns_desktop = get_post_meta($post->ID, '_work_gallery_columns_desktop', true);
                    $gallery_columns_mobile = get_post_meta($post->ID, '_work_gallery_columns_mobile', true);
                    $gallery_gutter = get_post_meta($post->ID, '_work_gallery_gutter', true);
                    ?>
                    <p>
                        <label for="work_gallery_columns_desktop">デスクトップ列数:</label>
                        <input type="number" id="work_gallery_columns_desktop" name="work_gallery_columns_desktop" value="<?php echo esc_attr($gallery_columns_desktop); ?>" class="small-text" min="1" max="6" placeholder="2">
                    </p>
                    <p>
                        <label for="work_gallery_columns_mobile">モバイル列数:</label>
                        <input type="number" id="work_gallery_columns_mobile" name="work_gallery_columns_mobile" value="<?php echo esc_attr($gallery_columns_mobile); ?>" class="small-text" min="1" max="4" placeholder="2">
                    </p>
                    <p>
                        <label for="work_gallery_gutter">間隔 (px):</label>
                        <input type="number" id="work_gallery_gutter" name="work_gallery_gutter" value="<?php echo esc_attr($gallery_gutter); ?>" class="small-text" min="0" max="100" placeholder="20">
                    </p>
                    <p class="description">空欄の場合はデフォルト値（列数: 2、間隔: 20px）が使用されます</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_layout_order">要素の表示順序</label></th>
                <td>
                    <input type="hidden" id="work_layout_order" name="work_layout_order" value="<?php echo esc_attr($layout_order); ?>">
                    <div id="layout_order_sortable" class="layout-order-list">
                        <?php
                        $order_items = explode(',', $layout_order);
                        $labels = array(
                            'video' => 'Video',
                            'content' => 'Content (本文)',
                            'gallery' => 'Gallery',
                            'audio' => 'Audio',
                        );
                        foreach ($order_items as $item) {
                            $item = trim($item);
                            if (isset($labels[$item])) {
                                echo '<div class="layout-item" data-value="' . esc_attr($item) . '"><span class="dashicons dashicons-menu"></span> ' . esc_html($labels[$item]) . '</div>';
                            }
                        }
                        ?>
                    </div>
                    <p class="description">ドラッグ＆ドロップで表示順序を変更できます</p>
                </td>
            </tr>
            <tr>
                <th><label for="work_credits">Credits</label></th>
                <td>
                    <textarea id="work_credits" name="work_credits" rows="8" class="large-text"><?php echo esc_textarea($credits); ?></textarea>
                    <p class="description">1行に1つのクレジットを入力してください。例:<br>Artist：諏訪綾子<br>Sound Installation：HAL ca</p>
                </td>
            </tr>
        </table>
        <script>
        jQuery(document).ready(function($) {
            // Audio upload
            var audioUploader;
            $('#upload_audio_button').click(function(e) {
                e.preventDefault();
                if (audioUploader) { audioUploader.open(); return; }
                audioUploader = wp.media({
                    title: 'Select Audio File',
                    button: { text: 'Use this audio' },
                    library: { type: 'audio' },
                    multiple: false
                });
                audioUploader.on('select', function() {
                    var attachment = audioUploader.state().get('selection').first().toJSON();
                    $('#work_audio_file').val(attachment.id);
                    $('#audio_preview').html('<audio controls src="' + attachment.url + '" style="max-width: 300px;"></audio>');
                    $('#remove_audio_button').show();
                });
                audioUploader.open();
            });
            $('#remove_audio_button').click(function(e) {
                e.preventDefault();
                $('#work_audio_file').val('');
                $('#audio_preview').html('');
                $(this).hide();
            });

            // Gallery images
            var galleryUploader;
            $('#add_gallery_images_button').click(function(e) {
                e.preventDefault();
                if (galleryUploader) { galleryUploader.open(); return; }
                galleryUploader = wp.media({
                    title: 'Select Gallery Images',
                    button: { text: 'Add to gallery' },
                    library: { type: 'image' },
                    multiple: true
                });
                galleryUploader.on('select', function() {
                    var attachments = galleryUploader.state().get('selection').toJSON();
                    var currentIds = $('#work_gallery_images').val() ? $('#work_gallery_images').val().split(',') : [];
                    attachments.forEach(function(attachment) {
                        if (currentIds.indexOf(String(attachment.id)) === -1) {
                            currentIds.push(attachment.id);
                            var thumb = attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
                            $('#gallery_preview').append('<div class="gallery-item" data-id="' + attachment.id + '"><img src="' + thumb + '"><button type="button" class="remove-image">&times;</button></div>');
                        }
                    });
                    $('#work_gallery_images').val(currentIds.join(','));
                });
                galleryUploader.open();
            });

            // Remove gallery image
            $(document).on('click', '.gallery-item .remove-image', function(e) {
                e.preventDefault();
                var $item = $(this).closest('.gallery-item');
                var removeId = String($item.data('id'));
                var currentIds = $('#work_gallery_images').val().split(',').filter(function(id) {
                    return id !== removeId;
                });
                $('#work_gallery_images').val(currentIds.join(','));
                $item.remove();
            });

            // Layout order sortable
            $('#layout_order_sortable').sortable({
                placeholder: 'ui-sortable-placeholder',
                update: function(event, ui) {
                    var order = [];
                    $('#layout_order_sortable .layout-item').each(function() {
                        order.push($(this).data('value'));
                    });
                    $('#work_layout_order').val(order.join(','));
                }
            });
        });
        </script>
        <?php
    }

    /**
     * Render Release Meta Box
     */
    public function render_release_meta_box($post) {
        wp_nonce_field('wave_release_meta', 'wave_release_meta_nonce');

        $display_order = get_post_meta($post->ID, '_release_display_order', true);
        $featured = get_post_meta($post->ID, '_release_featured', true);
        $featured_order = get_post_meta($post->ID, '_release_featured_order', true);
        $featured_halca = get_post_meta($post->ID, '_release_featured_halca', true);
        $featured_halca_order = get_post_meta($post->ID, '_release_featured_halca_order', true);
        $release_type_label = get_post_meta($post->ID, '_release_type_label', true);
        $release_date = get_post_meta($post->ID, '_release_date', true);
        $tracks = get_post_meta($post->ID, '_release_tracks', true);
        $listen_url = get_post_meta($post->ID, '_release_listen_url', true);
        $apple_music_url = get_post_meta($post->ID, '_release_apple_music_url', true);
        $spotify_url = get_post_meta($post->ID, '_release_spotify_url', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="release_display_order">表示順</label></th>
                <td>
                    <input type="number" id="release_display_order" name="release_display_order" value="<?php echo esc_attr($display_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">小さい数字が先に表示されます（例: 1, 2, 3...）</p>
                </td>
            </tr>
            <tr>
                <th>FEATURED（TOP）</th>
                <td>
                    <label><input type="checkbox" name="release_featured" value="1" <?php checked($featured, '1'); ?>> TOPページのFEATUREDに表示する</label>
                    <br><br>
                    <label for="release_featured_order">FEATURED表示順:</label>
                    <input type="number" id="release_featured_order" name="release_featured_order" value="<?php echo esc_attr($featured_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">FEATURED内での表示順（小さい数字が先）</p>
                </td>
            </tr>
            <tr>
                <th>FEATURED（HAL ca）</th>
                <td>
                    <label><input type="checkbox" name="release_featured_halca" value="1" <?php checked($featured_halca, '1'); ?>> HAL caページのFEATUREDに表示する</label>
                    <br><br>
                    <label for="release_featured_halca_order">FEATURED表示順:</label>
                    <input type="number" id="release_featured_halca_order" name="release_featured_halca_order" value="<?php echo esc_attr($featured_halca_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">HAL ca FEATURED内での表示順（小さい数字が先）</p>
                </td>
            </tr>
            <tr>
                <th><label for="release_type_label">Release Type</label></th>
                <td>
                    <input type="text" id="release_type_label" name="release_type_label" value="<?php echo esc_attr($release_type_label); ?>" class="regular-text" placeholder="Album, EP, Single など">
                    <p class="description">タイトル下に「2024. Album」のように表示されます</p>
                </td>
            </tr>
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
        $display_order = get_post_meta($post->ID, '_member_display_order', true);
        $mobile_image_id = get_post_meta($post->ID, '_member_mobile_image', true);
        $mobile_image_url = $mobile_image_id ? wp_get_attachment_image_url($mobile_image_id, 'thumbnail') : '';
        ?>
        <table class="form-table">
            <tr>
                <th><label for="member_display_order">表示順</label></th>
                <td>
                    <input type="number" id="member_display_order" name="member_display_order" value="<?php echo esc_attr($display_order); ?>" class="small-text" min="0" step="1">
                    <p class="description">小さい数字が先に表示されます（例: 1, 2, 3...）</p>
                </td>
            </tr>
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
            <tr>
                <th><label for="member_mobile_image">Mobile Image</label></th>
                <td>
                    <input type="hidden" id="member_mobile_image" name="member_mobile_image" value="<?php echo esc_attr($mobile_image_id); ?>">
                    <div id="mobile_image_preview" style="margin-bottom: 10px;">
                        <?php if ($mobile_image_url): ?>
                            <img src="<?php echo esc_url($mobile_image_url); ?>" style="max-width: 150px; height: auto;">
                        <?php endif; ?>
                    </div>
                    <button type="button" class="button" id="upload_mobile_image_button">Select Image</button>
                    <button type="button" class="button" id="remove_mobile_image_button" <?php echo $mobile_image_id ? '' : 'style="display:none;"'; ?>>Remove</button>
                    <p class="description">モバイル表示用の画像（オプション）。指定しない場合はアイキャッチ画像が使用されます。</p>
                </td>
            </tr>
        </table>
        <script>
        jQuery(document).ready(function($) {
            var mediaUploader;
            $('#upload_mobile_image_button').click(function(e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media({
                    title: 'Select Mobile Image',
                    button: { text: 'Use this image' },
                    multiple: false
                });
                mediaUploader.on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    $('#member_mobile_image').val(attachment.id);
                    $('#mobile_image_preview').html('<img src="' + attachment.sizes.thumbnail.url + '" style="max-width: 150px; height: auto;">');
                    $('#remove_mobile_image_button').show();
                });
                mediaUploader.open();
            });
            $('#remove_mobile_image_button').click(function(e) {
                e.preventDefault();
                $('#member_mobile_image').val('');
                $('#mobile_image_preview').html('');
                $(this).hide();
            });
        });
        </script>
        <?php
    }

    /**
     * Save Meta Boxes
     */
    public function save_meta_boxes($post_id) {
        // Work meta
        if (isset($_POST['wave_work_meta_nonce']) && wp_verify_nonce($_POST['wave_work_meta_nonce'], 'wave_work_meta')) {
            // Display order
            if (isset($_POST['work_display_order'])) {
                update_post_meta($post_id, '_work_display_order', intval($_POST['work_display_order']));
            }
            // Featured (TOP)
            update_post_meta($post_id, '_work_featured', isset($_POST['work_featured']) ? '1' : '');
            if (isset($_POST['work_featured_order'])) {
                update_post_meta($post_id, '_work_featured_order', intval($_POST['work_featured_order']));
            }
            // Featured (HAL ca)
            update_post_meta($post_id, '_work_featured_halca', isset($_POST['work_featured_halca']) ? '1' : '');
            if (isset($_POST['work_featured_halca_order'])) {
                update_post_meta($post_id, '_work_featured_halca_order', intval($_POST['work_featured_halca_order']));
            }
            // Text fields
            $text_fields = array('work_client', 'work_date', 'work_role', 'work_role_en', 'work_url');
            foreach ($text_fields as $field) {
                if (isset($_POST[$field])) {
                    update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
                }
            }
            // Textarea fields
            if (isset($_POST['work_video_urls'])) {
                update_post_meta($post_id, '_work_video_urls', sanitize_textarea_field($_POST['work_video_urls']));
            }
            // Credits field (plain text, one per line)
            if (isset($_POST['work_credits'])) {
                update_post_meta($post_id, '_work_credits', sanitize_textarea_field($_POST['work_credits']));
            }
            // Media fields
            if (isset($_POST['work_audio_file'])) {
                update_post_meta($post_id, '_work_audio_file', intval($_POST['work_audio_file']));
            }
            if (isset($_POST['work_gallery_images'])) {
                update_post_meta($post_id, '_work_gallery_images', sanitize_text_field($_POST['work_gallery_images']));
            }
            // Gallery settings
            if (isset($_POST['work_gallery_columns_desktop'])) {
                $val = intval($_POST['work_gallery_columns_desktop']);
                update_post_meta($post_id, '_work_gallery_columns_desktop', $val > 0 ? $val : '');
            }
            if (isset($_POST['work_gallery_columns_mobile'])) {
                $val = intval($_POST['work_gallery_columns_mobile']);
                update_post_meta($post_id, '_work_gallery_columns_mobile', $val > 0 ? $val : '');
            }
            if (isset($_POST['work_gallery_gutter'])) {
                $val = intval($_POST['work_gallery_gutter']);
                update_post_meta($post_id, '_work_gallery_gutter', $val >= 0 ? $val : '');
            }
            // Layout order
            if (isset($_POST['work_layout_order'])) {
                update_post_meta($post_id, '_work_layout_order', sanitize_text_field($_POST['work_layout_order']));
            }
        }

        // Release meta
        if (isset($_POST['wave_release_meta_nonce']) && wp_verify_nonce($_POST['wave_release_meta_nonce'], 'wave_release_meta')) {
            // Display order
            if (isset($_POST['release_display_order'])) {
                update_post_meta($post_id, '_release_display_order', intval($_POST['release_display_order']));
            }
            // Featured (TOP)
            update_post_meta($post_id, '_release_featured', isset($_POST['release_featured']) ? '1' : '');
            if (isset($_POST['release_featured_order'])) {
                update_post_meta($post_id, '_release_featured_order', intval($_POST['release_featured_order']));
            }
            // Featured (HAL ca)
            update_post_meta($post_id, '_release_featured_halca', isset($_POST['release_featured_halca']) ? '1' : '');
            if (isset($_POST['release_featured_halca_order'])) {
                update_post_meta($post_id, '_release_featured_halca_order', intval($_POST['release_featured_halca_order']));
            }
            if (isset($_POST['release_type_label'])) {
                update_post_meta($post_id, '_release_type_label', sanitize_text_field($_POST['release_type_label']));
            }
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
            $fields = array('member_name_en', 'member_role', 'member_achievements', 'member_mobile_image', 'member_display_order');
            foreach ($fields as $field) {
                if (isset($_POST[$field])) {
                    if ($field === 'member_achievements') {
                        $value = sanitize_textarea_field($_POST[$field]);
                    } elseif ($field === 'member_display_order') {
                        $value = intval($_POST[$field]);
                    } else {
                        $value = sanitize_text_field($_POST[$field]);
                    }
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
