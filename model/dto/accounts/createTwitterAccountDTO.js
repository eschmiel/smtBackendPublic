function CreateTwitterAccountDTO(twitter_id, access_token, access_token_secret) {
    this.twitter_id = twitter_id;
    this.access_token = access_token;
    this.access_token_secret = access_token_secret;
}


module.exports = CreateTwitterAccountDTO;