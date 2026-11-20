import { useState } from 'react';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import './App.css';
import AlertUI from './components/AlertUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import IndicatorUI from './components/IndicatorUI';
import SelectorUI from './components/SelectorUI';
import TableUI from './components/TableUI';
import useFetchData from './hooks/useFetchData';

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { data, loading, error } = useFetchData(selectedOption);

  const hourlyLabels = data?.hourly.time.map((tiempo) => tiempo.slice(11));

  return (
    <Grid
      container
      spacing={5}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid size={{ xs: 12 }}>
        <HeaderUI />
      </Grid>

      <Grid
        container
        size={{ xs: 12 }}
        sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <AlertUI description="No se prevén lluvias" />
        <AlertUI
          description="Índice UV alto"
          severity="warning"
          variant="filled"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI onOptionSelect={setSelectedOption} />
      </Grid>
      <Grid container size={{ xs: 12, md: 9 }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Temperatura (2m)"
              description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Temperatura aparente"
              description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Velocidad del viento"
              description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Humedad relativa"
              description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
            />
          )}
        </Grid>
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {data && hourlyLabels && (
          <ChartUI
            title="Temperatura y viento por hora"
            labels={hourlyLabels}
            values1={data.hourly.temperature_2m}
            values2={data.hourly.wind_speed_10m}
            label1={`Temperatura (${data.hourly_units.temperature_2m})`}
            label2={`Viento (${data.hourly_units.wind_speed_10m})`}
          />
        )}
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {data && hourlyLabels && (
          <TableUI
            labels={hourlyLabels}
            values1={data.hourly.temperature_2m}
            values2={data.hourly.wind_speed_10m}
            header1={data.hourly_units.temperature_2m}
            header2={data.hourly_units.wind_speed_10m}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;
