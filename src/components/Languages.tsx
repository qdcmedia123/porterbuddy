import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { Table, Container, THead, Tr, Th, TBody } from 'components/StyledComponents';
import ListLanguages from 'components/List/ListLanguages';
import Header from 'components/Common/Header';
import { GetTableData } from 'controllers/ListLanguageController';
import Skeleton from 'react-loading-skeleton';
import { Countries } from 'components/Interfaces'
import { Pagination } from 'react-bootstrap';
import { languages } from 'assets/languages';
import useOnClickOutside from "components/hooks/useOnClickOutside";

const Languages: React.FC = () => {
    const ref = useRef<any>(null);
    const [data, setData] = useState<Countries[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pager, setPager] = useState<number | null>(null);
    const [active, setActive] = useState<number>(1);
    const [items, setItems] = useState<any>(null);
    const [countries, setCountries] = useState<any>(null);
    const [popUp, setPopUp] = useState<boolean>(false);
    const limit: number = 20;

    useOnClickOutside(ref, () => setPopUp(false));

    useEffect(() => {
        const pager = Math.ceil(languages.length / limit);
        setPager(pager);
    }, []);

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
    }, [active, updatePage, pager]);

    const paginationBasic = useMemo(() => {
        return <Pagination size="sm" >{items}</Pagination>;
    }, [items]);

    useEffect(() => {
        getListCountries();
    }, [getListCountries]);

    const getCountries = useMemo(() => {
        if (popUp) {
            if (countries && countries.length > 0) {
                return <div className="inner__countries" ref={ref}>
                    <ul>{countries.map((item: any, i: number) => <li key={i}>{item}</li>)}</ul>
                </div>
            }
        }
    }, [countries, popUp]);

    return (
        <div className = "background-shadow">
            {getCountries}
            <Header />
            <Container>
                <div className="table__container">
                    {!loading && data && <><Table>
                        <THead>
                            <Tr>
                                <Th >Language</Th>
                                <Th>Country</Th>
                                <Th >Population</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            <ListLanguages setPopUp={setPopUp} setCountries={setCountries} rows={data.slice(active === 1 ? 0 : (active - 1) * limit, limit * active)} />
                        </TBody>
                    </Table></>}
                </div>
                {!loading && data && <div className="jcc">{paginationBasic}</div>}
                {loading && <Skeleton count={30} />}
            </Container>
        </div>
    );
};
export default Languages;