import './App.css';
import { Route,Routes } from 'react-router-dom';
import Error from './pages/Error';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './components/Core/Dashboard/Profile';
import Team from './components/Core/Dashboard/Team';
import Myproject from './components/Core/Dashboard/Myproject';
import ViewTasks from './pages/ViewTeam';
import ViewTodos from './components/commen/viewtask/ViewTodos';
import ViewAllTasks from './components/commen/viewtask/ViewAllTasks';
import ViewMyTodo from './components/Core/Dashboard/ViewMyTodo';
import Setting from './components/Core/Dashboard/Setting';
import VerifyEmail from './pages/VerifyEmail';
import Resetpasspage from './pages/Resetpasspage';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900">
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/reset-password' element={<Resetpasspage/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='*' element={<Error/>}/>
        <Route element={<Dashboard/>}>
          <Route path='/dashboard/profile' element={<Profile/>} />
          <Route path='/dashboard/setting' element={<Setting/>} />
          <Route path='/dashboard/my-project' element={<Myproject/>} />
          <Route path='/dashboard/my-project/:taskId' element={<ViewMyTodo/>} />
          {/* <Route path='/dashboard/todo' element={<Todo/>} /> */}
          <Route path='/dashboard/teams' element={<Team/>} />
        </Route>
        <Route element={<ViewTasks/>}>
          <Route path='/view-team/:teamId/task/:taskId'  element={<ViewTodos/>} />
          <Route path='/view-team/:teamId' element={<ViewAllTasks/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
