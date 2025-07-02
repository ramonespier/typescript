// interfaces define tipos
// interfaces sao "contratos", quando o criamos, precisamos seguir suas "regras"
function createUser(name) {
    return {
        name, createdAt: new Date(),
        talk() {
            console.log('Eu sou o ', name);
        },
    };
}
function updateWallet(user, wallet) {
    user.wallet = { ...user.wallet, ...wallet };
}
const ramon = createUser('Ramon Coelho');
ramon.talk;
updateWallet(ramon, { coins: 15 });
function promoteUser(user) {
    return {
        ...user,
        ban(userToBan) {
            console.log(userToBan, 'foi banido por ', this.name);
        },
        kick(userToKick) {
            console.log(userToKick, 'foi expulso por ', this.name);
        }
    };
}
const admRamon = promoteUser(ramon);
function admActions(admin) { }
admActions(admRamon);
export {};
