import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, THead, Tr, Th, TBody } from 'components/StyledComponents';
import ListLanguages from 'components/List/ListLanguages';
import Header from 'components/Common/Header';
import { GetTableData } from 'controllers/ListLanguageController';
import Skeleton from 'react-loading-skeleton';

const Languages: React.FC = () => {
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        getListCountries();
    }, [getListCountries])
    return (
        <>
            <Header />
            <Container>
                {!loading && data && <Table>
                    <THead>
                        <Tr>
                            <Th >Language</Th>
                            <Th>Country</Th>
                            <Th >Population</Th>
                        </Tr>
                    </THead>
                    <TBody>

                        <ListLanguages rows={data} />
                    </TBody>
                </Table>}

                {loading && <Skeleton count={30} />}
            </Container>
        </>
    );
};

export default Languages;