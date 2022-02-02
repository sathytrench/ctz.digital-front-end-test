import { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

import logo from './logo.svg';
import './App.css';
import data from './data.json';

function App() {
  const [enabledStatus, setEnabledStatus] = useState(data.settings.general.enabled);
  const [testPublisherStatus, setTestPublisherStatus] = useState(data.settings.general.testPublisher);
  const [accountType, setAccountType] = useState(data.settings.general.accountType);
  const [revenueShare, setRevenueShare] = useState(data.settings.revenue.publisherShare);

  const updateData = ({ target }) => {
    const { value, name } = target;
    if (name === "enabledStatus") {
      setEnabledStatus(target.checked);
    } else if (name === "testPublisherStatus") {
      setTestPublisherStatus(target.checked);
    } else if (name === "accountType") {
      setAccountType(value);
    } else if (name === "revenueShare") {
      setRevenueShare(value);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h1" component="h1">Welcome, {data.name}!</Typography>
      </header>
      <Container className="container">
        <Box className="company-container">
          <Typography variant="h4" component="h1">Company Info</Typography>
          <Box className="field-container">
            <FormControlLabel 
            control={
              <Checkbox
                onChange={e => updateData(e)}
                name="enabledStatus"
                color="secondary"
                checked={enabledStatus}
              />
            }
            label="Enabled"
            />
          </Box>
          <Box className="field-container">
            <FormControlLabel 
            control={
              <Checkbox
                onChange={e => updateData(e)}
                name="testPublisherStatus"
                color="secondary"
                checked={testPublisherStatus}
              />
            }
            label="Test Publisher"
            />
          </Box>
          <Box className="field-container">
            <Typography component="p">Time Zone: {data.settings.general.timezone}</Typography>
          </Box>
          <Box className="field-container">
            <Typography component="p">Account Type:</Typography>
            <Box className="select-container">
              <FormControl>
                  <Select
                    labelId="account-type-select-label"
                    id="account-type-select"
                    name="accountType"
                    value={accountType}
                    onChange={e => updateData(e)}
                    className="multiple-select"
                  >
                      <MenuItem value="CTZero">CTZero</MenuItem>
                      <MenuItem value="CTLite">CTLite</MenuItem>
                      <MenuItem value="CTPlus">CTPlus</MenuItem>
                      <MenuItem value="CTPro">CTPro</MenuItem>
                  </Select>
              </FormControl>
            </Box>    
          </Box>
          <Box className="field-container">
            <Typography component="p">Revenue Share:</Typography>
            <Box className="select-container">
            <FormControl>
                  <Select
                    labelId="revenue-share-select-label"
                    id="revenue-share-select"
                    name="revenueShare"
                    value={revenueShare}
                    onChange={e => updateData(e)}
                    className="multiple-select"
                  >
                      <MenuItem value={0.1}>0.1</MenuItem>
                      <MenuItem value={0.2}>0.2</MenuItem>
                      <MenuItem value={0.3}>0.3</MenuItem>
                      <MenuItem value={0.4}>0.4</MenuItem>
                      <MenuItem value={0.5}>0.5</MenuItem>
                      <MenuItem value={0.6}>0.6</MenuItem>
                      <MenuItem value={0.7}>0.7</MenuItem>
                      <MenuItem value={0.8}>0.8</MenuItem>
                      <MenuItem value={0.9}>0.9</MenuItem>
                  </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="field-container">
            <Typography component="p">Terms of service:</Typography>
            <input type="file"></input>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" component="h1">Sites</Typography>
          {data.sites.length && 
          <Box className="sites-container">
            {data.sites.map(site => (
              <Box key={site.id}>
                <Box className="field-container">
                  <Typography>ID: {site.id}</Typography>
                  <Typography>NAME: {site.displayName}</Typography>
                  <Typography>URL: {site.domain}</Typography>
                  <Typography>STATUS: {site.enabled ? ("ENABLED") : ("DISABLED")}</Typography>
                  <TextField
                    id="script-delay-select"
                    label="Script Delay (ms)"
                    type="number"
                    defaultValue={site.scriptDelay ? (site.scriptDelay) : (0)}
                    onChange={e => console.log("I hope this does something someday")}
                  >
                  </TextField>
                  {site.activeProducts.length &&
                    <Box>
                      {site.activeProducts.map((product, idx) => (
                        <Box key={`${site.id}-${idx}`} className="card">
                          <Typography align="center" variant="h6">{product.type}</Typography>
                          {product.devices?.map((device, idx) => (
                            <Typography key={`device-${idx}`}>
                              {device.type}: {device.enabled ? ("enabled") : ("disabled")}
                            </Typography>
                            ))}
                        </Box>
                      ))}
                    </Box>
                  }
                </Box>
              </Box>
            ))}
          </Box>
          }
        </Box>
        <Box className="button">
          <Button onClick={()=>console.log("We'll probably need this one day")}>SAVE CHANGES</Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
