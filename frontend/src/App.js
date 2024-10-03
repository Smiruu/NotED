
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/Homescreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetpasswordScreen";
import ConfirmChangePasswordScreen from "./screens/Confirmresetpassword";
<<<<<<< HEAD
import GroupListScreen from "./screens/GroupListScreen";
import GroupViewScreen from "./screens/GroupViewScreen";
=======
import TodolistScreen from "./screens/TodolistScreen";
import GroupListScreen from "./screens/GroupListScreen";
import GroupViewScreen from "./screens/GroupViewScreen";
import ProfileScreen from "./screens/ProfileScreen";
>>>>>>> origin/master
function App() {
  return (
    <Router>
      <main className="py-3">
        <Container fluid>
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/reset-password" element={<ResetPasswordScreen/>} />
            <Route path="api/user/reset/:uid/:token" element={<ConfirmChangePasswordScreen />} />
<<<<<<< HEAD
            <Route path="/groups" element={<GroupListScreen/>} />
            <Route path="/groups/:group_tag" element={<GroupViewScreen/>} />

=======
            <Route path="/todolist" element={<TodolistScreen />}/>
            <Route path="/groups" element={<GroupListScreen/>} />
            <Route path="/groups/:group_tag" element={<GroupViewScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
>>>>>>> origin/master
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
