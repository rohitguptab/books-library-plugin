<div class="books_meta_box">
    <style scoped>
       .books_meta_box{margin:0 -12px}
        .books_meta_box .book_field{padding:15px 12px;border-bottom:#EEEEEE solid 1px}
        .books_meta_box .book_field label{width:100%;display:block;margin-bottom:6px;font-weight:700}
        .books_meta_box .book_field input{width:100%}
        .books_meta_box .book_field:last-child{margin-bottom:0;padding-bottom:0;border-bottom:0}
    </style>
     <div class="meta-options book_field">
        <label for="book_price">Price</label>
        <input id="book_price"
            type="number"
            name="book_price"
            value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'book_price', true ) ); ?>">
    </div>
    <div class="meta-options book_field">
        <label for="books_rating">Rating</label>
        <input id="books_rating"
            min="0"
            max="5"
            type="number"
            name="books_rating"
            value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'books_rating', true ) ); ?>">
    </div>
    <div class="meta-options book_field">
        <label for="book_link">Link</label>
        <input id="book_link"
            type="text"
            name="book_link"
            value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'book_link', true ) ); ?>">
    </div>
</div>