import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Container, THead, Tr, Th, TBody, Div } from './StyledComponents';
import ListCountries from './List/ListCountries';

type counTries = any;

interface Sort {
    name: boolean | null | any;
    area: boolean | null | any;
}

const ListCounTries = () => {
    const [listCountries, setListCountries] = useState<counTries>(null);
    const [sort, setSort] = useState<Sort>({ name: null, area: null })
    const [loading, setLoading] = useState<boolean>(false);
    const [summary, setSummary] = useState<any>([]);
    const [averagePop, setAveragePopulation] = useState<null | number>(null);
    const limit: number = 20;

    const fetchCounTries = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://restcounTries.eu/rest/v2/all');
            const copyRes = [...response.data];
            copyRes.sort(function (a: any, b: any) {
                return a['area'] - b['area'];
            });
            const pouplation = response.data.map((item: any) => {
                if (!isNaN(item.population)) {
                    return item.population;
                } else {
                    return 0;
                }
            });
            const totalPopulation = pouplation.reduce((a: any, b: any) => {
                return a + b;
            }, 0);
            const averagePopulation = totalPopulation / response.data.length;
           
            setAveragePopulation(averagePopulation);
           
            const filterCopyRes = copyRes.filter(country => {
                return country.area !== null;
            });
            const largest = filterCopyRes[filterCopyRes.length - 1];
            const smallest = filterCopyRes[0];
           
            setSummary([smallest, largest]);
            setListCountries(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, []);

    useEffect(() => {
        fetchCounTries();
    }, [fetchCounTries]);


    const sortByName = useCallback((sortBy: any, ns: string): void => {
        let cloneCountreis = [...listCountries];
        // @ts-ignore
        const sortName = !sort[sortBy];
        setSort({ ...sort, [sortBy]: sortName });
        if (ns === 'number') {
            cloneCountreis.sort(function (a, b) {
                return sortName ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            });
            setListCountries(cloneCountreis);
            return;
        }

        cloneCountreis.sort(function (a, b) {
            var nameA = a[sortBy];
            var nameB = b[sortBy];
            return sortName ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
        });


        setListCountries(cloneCountreis);
    }, [listCountries, sort]);

    return (
        <Container>
            <Div>
                {!loading && listCountries && <Table>
                    <THead>
                        <Tr>
                            <Th onClick={() => sortByName('name', 'string')}>Name</Th>
                            <Th>Region</Th>
                            <Th onClick={() => sortByName('area', 'number')}>Area</Th>
                            <Th onClick={() => sortByName('population', 'number')}>Population(Mil)</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        <ListCountries rows={listCountries.slice(0, limit)} />
                        {/* <ListCountries rows={listCountries} /> */}
                    </TBody>
                </Table>
                }
            </Div>

            <Div>
                <h1>Summary</h1>
                <h4>Country with smallest area</h4>
                <ul>
                    <li>{!loading && summary && summary[0] && summary[0]['name'] + 'Area :' + summary[0]['area']}</li>
                </ul>
                <h4>Country with largest area</h4>
                <ul>
                    <li>{!loading && summary && summary[1] && summary[1]['name'] + ' Area :' + summary[1]['area']}</li>
                </ul>
                <h4>Average population</h4>
                <ul>
                    <li>{averagePop}</li>
                </ul>
            </Div>

        </Container>
    );
};


export default ListCounTries;