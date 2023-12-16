import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GaugeComponent from './components/Bar-Gauge/bar-gauge';
import GridComponent from './components/Data-grid/data-grid';
import FooterComponent from './components/Footer/footer';
import HeaderComponent from './components/Header/header';

const customPalette1 = [ '#103978' ];
const customPalette2 = [ '#059EDD' ];
const customPalette3 = [ '#04DED6' ];



function App() {
  return (
    <div className="App">
      <HeaderComponent />

      <section className='gauges'>
        <div className='component'>
          <GaugeComponent endpoint={'readAvg?column=temperature'} title={'Temperatura'} color={customPalette1} min={23} max={25} />
          <GridComponent endpoint={'readTotalValues?column=temperature'} id={'Dia'} />
        </div>
        <div className='component'>
          <GaugeComponent endpoint={'readAvg?column=humidity'} title={'Humedad'} color={customPalette2} min={30} max={100} />
          <GridComponent endpoint={'readTotalValues?column=humidity'} id={'Dia'} />
        </div>
        <div className='component'>
          <GaugeComponent endpoint={'readAvg?column=pressure'} title={'Presión'} color={customPalette3} min={900} max={1160} />
          <GridComponent endpoint={'readTotalValues?column=pressure'} id={'Dia'} />
        </div>
      </section>

      <div className='data-grid'>
        <h2>Vista de las últimas lecturas</h2>
        <GridComponent endpoint={'read'} id={'Id'} />
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;

// How make a body height = 100% with css?