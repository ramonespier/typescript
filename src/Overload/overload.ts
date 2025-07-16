/**
 * Criar uma nova data a partir de outra
 */
function createDate(value: Date): Date;
/**
 * Criar uma nova data usando uma data numerica
 */
function createDate(value: number): Date;
/**
 * Criar uma nova data usando uma data por extenso
 */
function createDate(value: string): Date;
function createDate(value: Date | number | string): Date {
    return new Date(value);
}
// createDate()