import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { API } from '../../api';

const Regions = () => {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    try {
      API.getAllRegions().then(data => {
        const regions = data.map(item => item.region);
        const uniq = [...new Set(regions)];
        setRegions(uniq);
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoTORegion = item => {
    history.push(`/region/${item.toLowerCase()}`);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {regions && (
        <List>
          {regions.map((item, index) => (
            <ListItem button key={index} onClick={() => handleGoTORegion(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Regions;
