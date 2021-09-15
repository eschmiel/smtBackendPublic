import { TwitterAccountDTOinterface } from '../../../configs/mainConfig';

class TwitterAccountDTO implements TwitterAccountDTOinterface {
    account_id: number;
    twitter_id: string;
    access_token: string;
    access_token_secret: string;

    constructor(account_id: number, twitter_id: string, access_token: string, access_token_secret: string) {
        this.account_id = account_id;
        this.twitter_id = twitter_id;
        this.access_token = access_token;
        this.access_token_secret = access_token_secret;
    }
}

export = TwitterAccountDTO;