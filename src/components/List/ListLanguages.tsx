import React from 'react';
import {Tr, Td} from 'components/StyledComponents';
import { row } from 'components/Interfaces';

interface LanguagesProps {
    rows: object | any;
}

const ListLanguages:React.FC<LanguagesProps> = ({rows}: LanguagesProps) => {
    return (
        rows && rows?.map((row:row, index:number) => <Tr key = {index}>
            <Td>{row.language}</Td>
            <Td className = "show__countries"> Details
                <span className = "inner__countries"> {row.countries.join(',')}</span>
                </Td>
            <Td>{row.population.length > 0 && row.population.reduce((a:any,b:any) => a + b)}</Td>
        </Tr>)
    );
};


export default ListLanguages;