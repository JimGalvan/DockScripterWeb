import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Button} from '@mantine/core';
import useAuthStore from "../../state/authStore";

const Header = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Box component="header" p="md" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
                {isAuthenticated && <Link to="/dashboard" style={{marginLeft: '1rem'}}>Dashboard</Link>}
            </Box>
            <Box>
                {isAuthenticated ? (
                    <Button variant="light" size="xs" onClick={handleLogout}>Logout</Button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" style={{marginLeft: '1rem'}}>Register</Link>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Header;