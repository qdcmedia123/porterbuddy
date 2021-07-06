import React from 'react';
import { Tr, Td } from 'components/StyledComponents';
import { row, ListCountries } from 'components/Interfaces';


const ListCounTries: React.FC<ListCountries> = ({ rows }: ListCountries) => {
    return (
        rows && rows?.map((row:row, index: number) => <Tr key = {index}>
            <Td>{row.name}</Td>
            <Td>{row.region}</Td>
            <Td>{Math.trunc(row.area)}</Td>
            <Td>{Math.round((row.population / 1000000) * 1e3) / 1e3}</Td>
        </Tr>)
    );
};


export default ListCounTries;