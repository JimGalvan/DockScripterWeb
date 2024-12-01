import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Container, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import '@mantine/core/styles.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import AuthRoute from "./components/Auth/AuthRoute";
import Dashboard from "./components/Dashboard";
import {Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateScriptForm from "./components/Scripts/CreateScriptForm";

const queryClient = new QueryClient();

const App = () => {
  return (
      <MantineProvider>
          <QueryClientProvider client={queryClient}>
              <Container>
                  <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable={false}
                      pauseOnHover
                      theme="light"
                      transition={Bounce}
                  />
                  <Router>
                      <Layout>
                          <Routes>
                              <Route path="/login" element={<LoginForm/>}/>
                              <Route path="/register" element={<RegisterForm/>}/>
                              <Route path="/dashboard" element={<AuthRoute><Dashboard/></AuthRoute>}/>
                              <Route path="/create-script" element={<AuthRoute>
                                  <CreateScriptForm/>
                              </AuthRoute>}/>
                              <Route path="/" element={<ProtectedRoute>
                                  <Navigate to="/dashboard" replace/>
                              </ProtectedRoute>}/>
                          </Routes>
                      </Layout>
                  </Router>
              </Container>
          </QueryClientProvider>
      </MantineProvider>
  );
};

export default App;