import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.js'
import Dashboard from './Dashboard.js'
const code=new URLSearchParams(new URL(window.location).search).get('code')
function App() {
  return (
    <div className="App">
      {code?<Dashboard code={code}/>: <Login/>}
    </div>
  );
}

export default App;
