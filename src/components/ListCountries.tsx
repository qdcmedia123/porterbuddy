import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Table, Container, THead, Tr, Th, TBody, Div } from './StyledComponents';
import ListCountries from './List/ListCountries';
import Header from './Common/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Pagination } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { getAveragePopulation, getLargestAndSmallest, sortByString, sortByNumber } from 'controllers/ListCountriesController';
import { SortInterface, Countries } from 'components/Interfaces'
import './listCountries.css';

const ListCounTries = () => {
    const [listCountries, setListCountries] = useState<Countries[]>([]);
    const [sort, setSort] = useState<SortInterface>({ name: null, area: null, population: null })
    const [loading, setLoading] = useState<boolean>(false);
    const [summary, setSummary] = useState<any>([]);
    const [averagePop, setAveragePopulation] = useState<null | number>(null);
    const [pager, setPager] = useState<number | null>(null);
    const [active, setActive] = useState<number>(1);
    const [items, setItems] = useState<any>(null);
    const limit: number = 20;

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

    const fetchCounTries = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get<Countries[]>('https://restcounTries.eu/rest/v2/all');
            const pager = Math.ceil(response.data.length / limit);
            setPager(pager);

            const averagePopulation = getAveragePopulation(response.data);
            setAveragePopulation(averagePopulation);

            const { smallest, largest } = getLargestAndSmallest([...response.data]);
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


    const sortByName = useCallback((sortBy: string, ns: string): void => {
        let cloneCountreis = [...listCountries];

        const sortName = !sort[sortBy];
        setSort({ ...sort, [sortBy]: sortName });

        if (ns === 'number') {
            cloneCountreis = sortByNumber(cloneCountreis, sortBy, sortName);
            setListCountries(cloneCountreis);
            return;
        }

        cloneCountreis = sortByString(cloneCountreis, sortBy, sortName);
        setListCountries(cloneCountreis);
    }, [listCountries, sort]);

    return (
        <>
            <Header />
            <Container>
                {!loading && listCountries && <>
                    <Div>
                        {!loading && listCountries && <Table>
                            <THead>
                                <Tr>
                                    <Th onClick={() => sortByName('name', 'string')}>Name {sort.name ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}</Th>
                                    <Th>Region</Th>
                                    <Th onClick={() => sortByName('area', 'number')}>Area {sort.area ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}</Th>
                                    <Th onClick={() => sortByName('population', 'number')}>Population(Mil) {sort.area ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                <ListCountries rows={listCountries.slice(active === 1 ? 0 : (active - 1) * limit, limit * active)} />
                            </TBody>
                        </Table>
                        }
                    </Div>
                    <div className="jcc">
                        {paginationBasic}
                    </div>
                    <div className="summary-container">
                        <h2>Summary</h2>
                        <div className = "col-container">
                        <div>
                            <h5 className="summary-head">Country with smallest area</h5>
                            <ul>
                                <li>{summary && summary[0] && summary[0]['name'] + 'Area :' + summary[0]['area']}</li>
                            </ul>
                        </div>

                        <div>
                            <h5>Country with largest area</h5>
                            <ul>
                                <li>{summary && summary[1] && summary[1]['name'] + ' Area :' + summary[1]['area']}</li>
                            </ul>
                        </div>
                        <div>
                            <h5>Average population</h5>
                            <ul>
                                <li>{averagePop}</li>
                            </ul>
                        </div>

                        </div>
                       
                    </div>

                </>
                }

                {loading && <Skeleton count={30} />}
            </Container>
        </>

    );
};

export default ListCounTries;