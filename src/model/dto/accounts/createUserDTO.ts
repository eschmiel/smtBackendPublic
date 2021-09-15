import { CreateUserDTOinterface } from '../../../configs/mainConfig';

class CreateUserDTO implements CreateUserDTOinterface {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export = CreateUserDTO;