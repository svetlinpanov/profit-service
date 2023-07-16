import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { StockOperationDisplayOptions } from 'src/types/stockOperation';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

export const CalculatorDisplayOptions: React.FC<{ solutions: StockOperationDisplayOptions[] }> = ({
  solutions,
}) => {
  function dateValueFormatter(params: GridValueFormatterParams) {
    const date = params.value as Date;
    return dayjs(date).format('DD MMM YYYY HH:mm:ss');
  }
  
  const dateColProperties: Partial<GridColDef> = {
    valueFormatter: dateValueFormatter,
    align: 'center',
    headerAlign: 'center',
  };
  const cols: GridColDef[] = [
    {
      field: 'stockName',
      headerName: 'Stock Name',
      description: 'Stock to buy',
      flex: 1,
    },
    {
      field: 'startDate',
      headerName: 'Buy Date',
      valueGetter: params => params.row.startDate,
      ...dateColProperties,
      flex: 2,
    },
    {
      field: 'endDate',
      headerName: 'Sell Date',
      valueGetter: params => params.row.endDate,
      ...dateColProperties,
      flex: 2,
    },
    {
      field: 'buyPrice',
      headerName: 'Buy Price',
      valueFormatter: params => `${params.value} $`,
      valueGetter: params => params.row.buyPrice,
      flex: 1,
    },
    {
      field: 'sellPrice',
      headerName: 'Sell Price',
      valueFormatter: params => `${params.value} $`,
      valueGetter: params => params.row.sellPrice,
      flex: 1,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      valueFormatter: params => `${params.value} seconds`,
      valueGetter: params => params.row.duration,
      flex: 1,
    },
    {
      field: 'profit',
      headerName: 'Profit',
      valueFormatter: params => `${params.value} $`,
      valueGetter: params => params.row.profit,
      flex: 1,
    }
  ];
  return (
    <Paper
          sx={{
            maxWidth: 936,
            padding: 3,
            height: '50%',
            margin: '10px auto',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateRows: 'auto auto',
          }}
        >
      <Box component="main" sx={{ flex: 1, py: 2, px: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Solutions</Typography>
            </Grid>          
            <DataGrid
              sx={{ border: 0, '.MuiDataGrid-row': { cursor: 'pointer' } }}
              getRowId={(row: any) =>  row.startDate + row.endDate}
              autoPageSize
              rowHeight={38}
              rows={solutions}
              columns={cols}
            /> 
        </Box>
      </Paper>
   );
};
