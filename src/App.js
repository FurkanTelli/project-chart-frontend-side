import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import StudentBarCharts from './components/students/StudentBarCharts';
import LoginComponent from './components/loginPage/LoginComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/admin' element={<StudentBarCharts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
