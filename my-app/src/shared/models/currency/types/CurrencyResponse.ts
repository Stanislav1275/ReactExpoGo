export type Currency = {
    symbol: string;
    name: string;
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
    type: 'fiat' | 'metal' | 'crypto',
    countries: string[]
};
export type CurrencyResponse = Record<string, Currency>;
