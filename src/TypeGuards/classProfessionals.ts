class Professionals {
    isChef(): this is Chef {
        return this instanceof Chef;
    }
    isTeacher(): this is Teacher {
        return this instanceof Teacher;
    }
    isDriver(): this is Driver {
        return this instanceof Driver;
    }
}

class Chef extends Professionals {
    public cook(): void {}
    public certificate: string = "Chefe barba"
}
class Teacher extends Professionals {
    public teach(): void {}
    public diploma: string = "Eu sou o Ramon"
}
class Driver extends Professionals {
    public drive(): void {}
    public license: string = "123456789"
}

function execute (professional: Professionals) {
    if (professional.isDriver()) {
        professional.drive()
    }

    switch(true) {
        case professional.isChef(): {
            professional.cook()
            break;
        }
        case professional.isDriver(): {
            professional.drive()
            break;
        }
        case professional.isTeacher(): {
            professional.teach()
            break;
        }
    }
}