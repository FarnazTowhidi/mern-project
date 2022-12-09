//react toolkit
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//utilities
import { getUser } from "../../utilities/UserRequests/users-service";
//pages
import AuthPage from "../AuthPage/AuthPage";
import CheckTokenPage from "../CheckTokenPage/CheckTokenPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ChatPage from "../ChatPage/ChatPage";
//styles
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import LogInForm from "../../components/LogInForm/LogInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export const themeOptions = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#2f15d1",

      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#A378FF",
    },
  },
});

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <ThemeProvider theme={themeOptions}>
        {user ? (
          <>
            <Routes>
              <Route path="/chats" element={<ChatPage user={user} />} />
              <Route
                path="/profile"
                element={<ProfilePage user={user} setUser={setUser} />}
              />
              <Route
                path="/signup"
                element={<SignUpForm user={user} setUser={setUser} />}
              />
              <Route
                path="/login"
                element={<LogInForm user={user} setUser={setUser} />}
              />
              <Route path="/*" element={<Navigate to="/chats" />} />
              <Route path="/check-token" element={<CheckTokenPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </ThemeProvider>
    </main>
  );
}

export default App;
