interface Component { id: string; label: string }

interface Button extends Component {
    style: string;
}
interface SelectMenu extends Component {
    options: string[]
}

enum InputType {
    String,
    Number,
    Date,
    Email,
    Password
}

interface Input extends Component {
    type: InputType
}

function buildComponent(id: string, label: string, style: string): Button
function buildComponent(id: string, label: string, options: string[]): SelectMenu
function buildComponent(id: string, label: string, type: InputType): Input 
function buildComponent(id: string, label: string, arg: string | string[] | InputType) {
    if(typeof arg === "string") {
        return { id, label, style: arg}
    }

    if (Array.isArray(arg)) {
        return { id, label, options: arg }
    }

    return { id, label, type: arg}
}

const button = buildComponent("myButton", "Clique aqui", "red")