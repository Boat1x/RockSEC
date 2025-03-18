// LandingPage.tsx

import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom'; //  Link,
//import { styled } from '@mui/material/styles';

interface ErrorResponse {
  statusText?: string;
  data?: string;
}

const LandingPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  console.log(error);

  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>{error.statusText || 'An error occurred'}</h1>
        <h3>{error.data || 'Please try again later'}</h3>

        <button onClick={() => navigate('/')}>GO HOME AND GOON</button>      
      </div>
    </>
  );
};

export default LandingPage;