import React, { useState, useEffect } from "react";
import "./App.scss";
import "leaflet/dist/leaflet.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Paper,
  Button,
  Typography,
  SvgIcon,
  Hidden,
  Link,
} from "@material-ui/core";
import Axios from "./api";
import InfoBox from "./Components/InfoBox";
import Table from "./Components/Table";
import { sortData, prettyPrintStat } from "./utils";
import LineGraph from "./Components/LineGraph";
import Map from "./Components/Map";
import { ReactComponent as Logo } from "./vn.svg";
// import Logo from "./vn.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    "& h5": {
      color: "red",
    },
  },
  form: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    "& button": {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
  },
  left: {
    width: "100%",
    padding: theme.spacing(1),
  },
  right: {
    width: "100%",
    padding: theme.spacing(1),
  },
  // right: {
  //   width: "100%",
  //   padding: "0 !important",
  // },
  footer: {
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const [mapCenter, setMapCenter] = useState({
    lat: 21,
    lng: 105.8,
  });
  const [mapZoom, setMapZoom] = useState(2);

  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getWorldWideInfo = async () => {
      const fetch = await Axios.get("/all");
      setCountryInfo(fetch.data);
    };

    getWorldWideInfo();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      const fetch = await Axios.get("/countries");
      const countries = fetch.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));

      const sortedData = sortData(fetch.data);

      setTableData(sortedData);
      setMapCountries(fetch.data);
      setCountries(countries);
    };

    getCountries();
  }, []);

  const handleChangeCountry = async (event) => {
    const code = event.target.value;

    const url = code === "worldwide" ? "/all" : `/countries/${code}`;

    const fetch = await Axios.get(`${url}`);
    setCountry(code);
    setCountryInfo(fetch.data);

    const pos =
      code === "worldwide"
        ? [18.679585, 105.681335]
        : [fetch.data.countryInfo.lat, fetch.data.countryInfo.long];

    setMapCenter(pos);
    setMapZoom(4);
  };

  const toVietNam = async (event) => {
    const fetch = await Axios.get(`countries/vn?strict=true`);
    setCountry("VN");
    setCountryInfo(fetch.data);
    setMapCenter([21, 105.8]);
    setMapZoom(4);
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container justify="center" spacing={3}>
        <Grid item lg={8} md={9} sm={12} className={classes.left}>
          <Paper className={classes.header}>
            <Hidden smDown>
              <Typography variant="h5">COVID-19 TRACKER</Typography>
            </Hidden>
            <FormControl className={classes.form}>
              <Button
                variant="outlined"
                onClick={toVietNam}
                startIcon={<SvgIcon component={Logo} viewBox="0 0 30 20" />}
              >
                Việt Nam
              </Button>
              <Select
                variant="outlined"
                value={country}
                onChange={handleChangeCountry}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem value={country.value} key={index}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          <div className={classes.stats}>
            <InfoBox
              active={casesType === "cases"}
              isRed
              onClick={(e) => setCasesType("cases")}
              title={"Cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={countryInfo.cases}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title={"Recovered"}
              isGreenText
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={countryInfo.recovered}
            />
            <InfoBox
              active={casesType === "deaths"}
              isRed
              onClick={(e) => setCasesType("deaths")}
              title={"Deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={countryInfo.deaths}
            />
          </div>

          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </Grid>
        <Grid item lg={4} md={3} sm={12} className={classes.right}>
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} casesType={casesType} />
              <h3>Worldwide new Cases</h3>
              <LineGraph casesType={casesType} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.footer}>
            <Typography variant="h5" align="center">
              Web Application developed by{" "}
              <Link href="https://fb.com/shynnhuy" variant="h5">
                Shynn
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
