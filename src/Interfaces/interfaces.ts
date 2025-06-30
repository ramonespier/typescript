// interfaces define tipos

interface UserWallet {
    coins?: number;
    credits?: number
}

interface User { // paskal case
    name: string,
    createdAt: Date;
    wallet?: UserWallet;
}

interface User {
    talk(): void;
}

// interfaces sao "contratos", quando o criamos, precisamos seguir suas "regras"

function createUser(name: string): User { // a interface se torna um "tipo"
    return {
        name, createdAt: new Date(),
        talk() {
            console.log('Eu sou o ', name)
        },
    }
}

function updateWallet(user: User, wallet: UserWallet) {
    user.wallet = { ...user.wallet, ...wallet }
}

const ramon = createUser('Ramon Coelho')
ramon.talk

updateWallet(ramon, { coins: 15 })

interface Admin extends User {
    ban(user: User): void;
    kick(user: User): void;
}

function promoteUser(user: User): Admin {
    return {
        ...user,
        ban(userToBan) {
            console.log(userToBan, 'foi banido por ', this.name)
        },
        kick(userToKick) {
            console.log(userToKick, 'foi expulso por ', this.name)
        }
    }
}

const admRamon = promoteUser(ramon);

function admActions(admin: Admin) {}

admActions(admRamon)