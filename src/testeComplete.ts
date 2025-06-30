interface ShowInfoOptions { // TIPAR para evitar erros
    displayDay?: boolean;
    displayMonth?: boolean;
    displayYear?: boolean;
}

function showInfo(date: Date, options: ShowInfoOptions = {}) {
    console.log(date.toLocaleDateString());
    if (options.displayDay) {
        console.log("dia", date.getDay)
    }
    if (options.displayMonth) {
        console.log("dia", date.getMonth)
    }
    if (options.displayYear) {
        console.log("dia", date.getFullYear)
    }
}

showInfo(new Date(), { displayDay: true })