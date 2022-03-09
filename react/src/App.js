import './App.css';
import Description from './Description';

const Mensaje = () => {
  return <h1>Mensaje desde Fn</h1>
}

function App() {
  return (
    <div className="App">
      <Mensaje />
      <Description msg="description param" color="red" />
    </div>
  )
}

export default App;
