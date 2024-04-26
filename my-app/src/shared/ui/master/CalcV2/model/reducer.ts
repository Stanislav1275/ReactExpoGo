export type State = {
    display: string;
    result: number | null;
    operator: string | null;
    waitingForOperand: boolean;
    history: string;
};

export type Action =
    | { type: 'digit'; payload: string }
    | { type: 'decimal' }
    | { type: 'operator'; payload: string }
    | { type: 'calculate' }
    | { type: 'clear' }
    | { type: 'invert' };

export const initialState: State = {
    display: '0',
    result: null,
    operator: null,
    waitingForOperand: false,
    history: '',
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'digit':
            return {
                ...state,
                display: state.waitingForOperand ? String(action.payload) : state.display === '0' ? String(action.payload) : state.display + String(action.payload),
                waitingForOperand: false,
                history: state.history + String(action.payload),
            };
        case 'decimal':
            return {
                ...state,
                display: state.display.includes('.') ? state.display : state.display + '.',
                waitingForOperand: false,
                history: state.history + '.',
            };
        case 'operator':
            if (state.result !== null) {
                const currentResult = parseFloat(state.display);
                console.log(currentResult)
                const newResult = calculate(state.operator, state.result, currentResult);
                return {
                    ...state,
                    result: newResult,
                    display: newResult.toString(),
                    operator: action.payload,
                    waitingForOperand: true,
                    history: state.history + ' ' + action.payload,
                };
            } else {
                return {
                    ...state,
                    result: parseFloat(state.display),
                    operator: action.payload,
                    waitingForOperand: true,
                    history: state.history + ' '  + action.payload,
                };
            }
        case 'calculate':
            if (state.operator && state.result !== null) {
                const currentResult = parseFloat(state.display);
                const finalResult = calculate(state.operator, state.result, currentResult);
                return {
                    ...state,
                    result: finalResult,
                    display: finalResult.toString(),
                    waitingForOperand: true,
                    history: '',
                };
            }
            return state;
        case 'clear':
            return {
                ...initialState,
                history: '',
            };
        case 'invert':
            return {
                ...state,
                display: (parseFloat(state.display) * -1).toString(),
                history: '-' + state.display,
            };
        default:
            return state;
    }
};

const calculate = (nextOperator: string, currentValue: number, nextValue: number): number => {
    switch (nextOperator) {
        case '+':
            return currentValue + nextValue;
        case '-':
            return currentValue - nextValue;
        case '×':
            return currentValue * nextValue;
        case '÷':
            return currentValue / nextValue;
        case '√':{
            console.log({currentValue})
            return Math.sqrt(currentValue);
        }

        case '1/x':
            return 1 / currentValue;
        default:
            return nextValue;
    }
};
