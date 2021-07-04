import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { languages } from '../assets/languages';
import { Table, Container, THead, Tr, Th, TBody} from './StyledComponents';
import ListLanguages from './List/ListLanguages';

const Languages: React.FC = () => {
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getListCountries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://restcounTries.eu/rest/v2/all');
            const countries = response.data.map((country: any) => {
                const { name, languages, population } = country;

                const getLan = languages.map((lng: any) => {
                    return lng.iso639_1;
                });
                return { name, languages: getLan, population };
            });

            const mapLan = languages.map((language) => {
                // Map countries
                let countryArr:any = [];
                let population:any = [];
                 countries.map((country:any) => {
                   if (country.languages.indexOf(language.alpha2) > -1) {
                      countryArr.push(country.name);
                      population.push(!isNaN(country.population) ? country.population : 0);
                   }
                   return countries;
                });
                const newData = {
                   language: language.English,
                   countries: countryArr,
                   population,
                };
                return newData;
                //return result.push(newData);
             });

            setData(mapLan);
            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }

    }, []);

    console.log(data);

    useEffect(() => {
        getListCountries();
    }, [getListCountries])
    return (
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
        </Container>
    );
};



export default Languages;