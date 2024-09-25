import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/Homescreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetpasswordScreen";
import ConfirmChangePasswordScreen from "./screens/Confirmresetpassword";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/reset-password" element={<ResetPasswordScreen/>} />
            <Route path="api/user/reset/:uid/:token" element={<ConfirmChangePasswordScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
