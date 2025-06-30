type NameList = string[]
type CalendarDate = [day: number, month: number, year: number]
const list: NameList = [];
list.push('Ramon')

const date: CalendarDate = [30, 6, 2025]

// desestruturar tupla

function createDate(date: CalendarDate) {
    const [day, month, year] = date
}

createDate(date)

// createDate([30, 6, 2025])