import { Grid } from '@mui/material';
import './App.css';
import AlertUI from './components/AlertUI';
import HeaderUI from './components/HeaderUI';
import SelectorUI from './components/SelectorUI';

function App() {
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
        <SelectorUI />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        Elemento: Gráfico
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        Elemento: Tabla
      </Grid>
      <Grid size={{ xs: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;
