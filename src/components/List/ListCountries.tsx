import React from 'react';

import { Tr, Td } from '../StyledComponents';

interface ListCountries {
    rows: any;
}

const ListCounTries: React.FC<ListCountries> = ({ rows }: ListCountries) => {
 
    return (
        // @ts-ignore
        rows && rows?.map(row => <Tr key = {row.name}>
            <Td>{row.name}</Td>
            <Td>{row.region}</Td>
            <Td>{Math.trunc(row.area)}</Td>
            <Td>{Math.round((row.population / 1000000) * 1e3) / 1e3}</Td>
        </Tr>)
    );
};


export default ListCounTries;