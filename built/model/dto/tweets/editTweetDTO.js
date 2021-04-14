"use strict";
var EditTweetDTO = /** @class */ (function () {
    function EditTweetDTO(post_id, edits) {
        this.post_id = post_id;
        this.account_id = edits.account_id;
        this.tweet_title = edits.tweet_title;
        this.tweet_text = edits.tweet_text;
    }
    return EditTweetDTO;
}());
module.exports = EditTweetDTO;
