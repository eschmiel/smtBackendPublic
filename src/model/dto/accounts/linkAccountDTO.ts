import { LinkAccountDTOinterface } from '../../../configs/mainConfig';

class LinkAccountDTO implements LinkAccountDTOinterface {
    user_id: number;
    account_id: number;

    constructor(user_id: number, account_id: number) {
        this.user_id = user_id;
        this.account_id = account_id;
    }
}

export = LinkAccountDTO;