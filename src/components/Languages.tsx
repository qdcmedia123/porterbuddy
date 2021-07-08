import React, { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Table, Container, THead, Tr, Th, TBody } from 'components/StyledComponents';
import ListLanguages from 'components/List/ListLanguages';
import Header from 'components/Common/Header';
import { GetTableData } from 'controllers/ListLanguageController';
import Skeleton from 'react-loading-skeleton';
import {Countries } from 'components/Interfaces'
import { Pagination } from 'react-bootstrap';
import { languages } from 'assets/languages';

const Languages: React.FC = () => {
    const [data, setData] = useState<Countries[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pager, setPager] = useState<number | null>(null);
    const [active, setActive] = useState<number>(1);
    const [items, setItems] = useState<any>(null);
    const limit: number = 20;

   useEffect(() => {
    const pager = Math.ceil(languages.length / limit);
    setPager(pager);
   }, [])

    const getListCountries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://restcounTries.eu/rest/v2/all');
            const getTableData = GetTableData(response.data);
            setData(getTableData);
            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }

    }, []);

    const updatePage = useCallback((page: number) => {
        setActive(page);
    }, []);

    useMemo(() => {
        if (pager !== null) {
            let items = [];
            for (let number = 1; number <= pager; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === active} onClick={() => updatePage(number)}>
                        {number}
                    </Pagination.Item>,
                );
            }
            setItems(items);
        }

    }, [active, updatePage, pager])

    const paginationBasic = useMemo(() => {
        return <Pagination size="sm" >{items}</Pagination>;
    }, [items]);



    useEffect(() => {
        getListCountries();
    }, [getListCountries])
    return (
        <>
            <Header />
            <Container>
                {!loading && data && <><Table>
                    <THead>
                        <Tr>
                            <Th >Language</Th>
                            <Th>Country</Th>
                            <Th >Population</Th>
                        </Tr>
                    </THead>
                    <TBody>
                  
                        <ListLanguages rows=  {data.slice(active === 1 ? 0 : (active - 1) * limit, limit * active)} />
                    </TBody>
                </Table>
                <div className = "jcc">{paginationBasic}</div></>}

                {loading && <Skeleton count={30} />}
            </Container>
        </>
    );
};

export default Languages;