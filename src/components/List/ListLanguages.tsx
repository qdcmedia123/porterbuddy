import React from 'react';
import { Tr, Td } from 'components/StyledComponents';
import { row } from 'components/Interfaces';

interface LanguagesProps {
    rows: object | any;
    setCountries: React.Dispatch<React.SetStateAction<object | null>>;
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListLanguages: React.FC<LanguagesProps> = ({ rows, setCountries, setPopUp }: LanguagesProps) => {

    const passFunction = (countries:any) => {
        setPopUp(true);
        setCountries(countries)
    }

    return (rows && rows?.map((row: row, index: number) => <Tr key={index}>
        <Td>{row.language}</Td>
        <Td> {row.countries.length > 0 && <span onClick = {() => passFunction(row.countries)} className = "details-text">Details </span>}
        </Td>
        <Td>{row.population.length > 0 && row.population.reduce((a: any, b: any) => a + b)}</Td>
    </Tr>)
    );
};


export default ListLanguages;