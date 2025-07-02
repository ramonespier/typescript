// tipagem segura
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 1] = "North";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["East"] = 3] = "East";
    Direction[Direction["West"] = 4] = "West";
})(Direction || (Direction = {}));
const pos = {
    x: 100,
    y: 230,
    direction: Direction.North
};
// enum tornam o codigo mais legivel e melhor para substituir numeros magicos/hardcoded
var CLothingSize;
(function (CLothingSize) {
    CLothingSize["ExtraSmall"] = "PP";
    CLothingSize["Small"] = "P";
    CLothingSize["Medium"] = "M";
    CLothingSize["Large"] = "G";
    CLothingSize["ExtraLarge"] = "GG";
})(CLothingSize || (CLothingSize = {}));
const cloth = {
    color: 'red',
    size: CLothingSize.ExtraLarge
};
export {};
