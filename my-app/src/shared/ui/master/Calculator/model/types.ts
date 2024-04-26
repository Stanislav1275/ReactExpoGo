export enum EOperation {
    minus = '-',
    plus = '+',
    multiply = '*',
    razdelete = '÷',
    remove = 'C',
    equal = '=',
    onex = '1/x',
    sqrt = '√t',
    invert = '±',
    point = ',',
    numeric0 = '0',
    numeric1 = '1',
    numeric2 = '2',
    numeric3 = '3',
    numeric4 = '4',
    numeric5 = '5',
    numeric6 = '6',
    numeric7 = '7',
    numeric8 = '8',
    numeric9 = '9',
}

export type CalculatorStateType = {
    operation: EOperation;
    displayValue:string
    firstOperand:null | EOperation;

}
