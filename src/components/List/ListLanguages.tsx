import React from 'react';
import {Tr, Td} from '../StyledComponents';

interface LanguagesProps {
    rows: object | any;
}

interface row {
    language: string;
    countries: any;
    population: any;
    name: string;
}

const ListLanguages:React.FC<LanguagesProps> = ({rows}: LanguagesProps) => {
    return (
     
        rows && rows?.map((row:row) => <Tr key = {row.name}>
            <Td>{row.language}</Td>
            <Td>{row.countries.join(',')}</Td>
            <Td>{row.population.length > 0 && row.population.reduce((a:any,b:any) => a + b)}</Td>
        </Tr>)
    );
};


export default ListLanguages;