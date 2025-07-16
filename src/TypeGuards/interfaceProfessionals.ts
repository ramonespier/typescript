interface Chef {
    cook(): void;
    certificate: string;
}

interface Teacher {
    teach(): void;
    diploma: string; 
}

interface Driver {
    drive(): void;
    license: string
}

type Professionals = Chef | Teacher | Driver;

function isChef(value: Professionals): value is Chef  {
    return (value as Chef).cook !== undefined
}
function isTeacher(value: Professionals): value is Teacher  {
    return (value as Teacher).teach !== undefined
}
function isDriver(value: Professionals): value is Driver  {
    return (value as Driver).drive !== undefined
}

function execute(professional: Professionals) {
    if(isChef(professional)) {
        professional.cook()
        return;
    }

    if(isTeacher(professional)) {
        professional.teach()
        return
    }

    professional.drive();
}

// outra alternativa com switch case
function switchExecute(professional: Professionals) {
    switch(true) {
        case isChef(professional): {
            professional.cook()
            break;
        }
        case isTeacher(professional): {
            professional.teach()
            break;
        }
        case isDriver(professional): {
            professional.drive()
            break;
        }
    }
}