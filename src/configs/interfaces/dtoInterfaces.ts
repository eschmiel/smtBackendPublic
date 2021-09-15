export interface CreateTwitterAccountDTOinterface {
    twitter_id: number;
    access_token: string;
    access_token_secret: string;
}

export interface CreateUserDTOinterface {
    username: string;
    password: string;
}

export interface LinkAccountDTOinterface {
    user_id: number;
    account_id: number;
}

export interface TwitterAccountDTOinterface {
    account_id: number;
    twitter_id: string;
    access_token: string;
    access_token_secret: string;
}

export interface EditTweetDTOinterface {
    post_id: number;
    account_id?: number;
    tweet_title?: string;
    tweet_text?: string;
}

export interface EditTweetOptions {
    account_id?: number;
    tweet_title?: string;
    tweet_text?: string;
}

export interface NewTweetDTOinterface {
    options?: NewTweetOptions;
    user_id: number;
    account_id: number;
    tweet_title: string;
    tweet_text?: string;
}

export interface NewTweetOptions {
    tweet_text?: string;
}

export interface TweetDTOinterface {
    post_id: number;
    user_id: number;
    account_id: number;
    username: string;
    twitter_id: string;
    tweet_title: string;
    tweet_text: string;
    tweet_id?: number;
    active_status: 'active' | 'inactive';
}

export interface TweetObj {
    post_id: number;
    user_id: number;
    account_id: number;
    username: string;
    twitter_id: string;
    tweet_title: string;
    tweet_text?: string;
    tweet_id?: number;
}