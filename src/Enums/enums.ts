// tipagem segura

enum Direction {
    North = 1,
    South,
    East,
    West
}

const pos = {
    x: 100,
    y: 230,
    direction: Direction.North
}

// enum tornam o codigo mais legivel e melhor para substituir numeros magicos/hardcoded

enum CLothingSize {
    ExtraSmall = "PP",
    Small = "P",
    Medium = "M",
    Large = "G",
    ExtraLarge = "GG"
}

const cloth = {
    color: 'red',
    size: CLothingSize.ExtraLarge
}