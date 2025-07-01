type Action = "create" | "update" | "delete"

function manage(action: Action) {}
manage("create")

type ImageSize = 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

interface Image {
    name: string;
    size: ImageSize
}

const image: Image = {
    name: 'Ramon',
    size: 1024
}