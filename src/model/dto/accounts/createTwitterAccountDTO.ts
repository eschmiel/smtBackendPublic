import { CreateTwitterAccountDTOinterface } from '../../../configs/mainConfig';

class CreateTwitterAccountDTO implements CreateTwitterAccountDTOinterface {
    twitter_id: number;
    access_token: string;
    access_token_secret: string;

    constructor(twitter_id: number, access_token: string, access_token_secret: string) {
        this.twitter_id = twitter_id;
        this.access_token = access_token;
        this.access_token_secret = access_token_secret;
    }
}

export = CreateTwitterAccountDTO;