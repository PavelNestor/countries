import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';

import { API } from '../../api';

const Region = () => {
  const [countries, setCountries] = useState(null);
  const [sortedCountries, setSortedCountries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const { region } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    try {
      API.getCountries(region).then(data => {
        setCountries(data);
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [region]);

  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    if (countries) {
      const result = countries
        .sort(
          order === 'desc'
            ? (a, b) => desc(a, b, orderBy)
            : (a, b) => -desc(a, b, orderBy)
        )
        .slice();
      setSortedCountries(result);
    }
  }, [order, orderBy, countries]);

  const handleSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleGoToCountry = name => {
    history.push(`/${name.toLowerCase()}`);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {sortedCountries && (
        <Container maxWidth="sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort('name')}
                  sortDirection={orderBy === 'name' ? order : false}
                >
                  Country
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => handleSort('population')}
                  sortDirection={orderBy === 'population' ? order : false}
                >
                  Population
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCountries.map(country => (
                <TableRow
                  key={country.name}
                  onClick={() => handleGoToCountry(country.name)}
                >
                  <TableCell>
                    <Typography variant="subtitle2">{country.name}</Typography>
                  </TableCell>

                  <TableCell align="right">{country.population}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default Region;
