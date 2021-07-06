export interface row {
    language: string;
    countries: any;
    population: any;
    name: string;
    region?: string;
    area?: any;
}

export interface ListCountries {
    rows: any
}

export interface SortInterface {
    [key: string]: null | string | boolean
}

export interface Countries {
    [key:number]:number
};