import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { DashPageHeader } from 'src/components/DashPageHeader';
import { GenerateProfit } from './CalculatorPage.GenerateProfit';

export const CalculatorPage: React.FC = () => {
  return (
    <>
      <DashPageHeader
        pageTitle="Profit Calculator"
      />
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        <Routes>
          <Route path="/" element={<GenerateProfit />} />
          <Route path="*" element={'Whoops, no page here.'} />
        </Routes>
      </Box>
    </>
  );
};
