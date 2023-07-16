import {
  Alert,
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ControlledTextField } from 'src/components/inputs/ControlledTextField';
import { CalculatorDisplayOptions } from './CalculatorPage.DisplayOptions';
import { StockOperationDisplayOptions, StockOperationRequestOptions } from 'src/types/stockOperation';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useGetAllSolutions, useGetMaxSolution } from 'src/hooks/solutions';

const today = dayjs();
const defaultValues: DefaultValues<StockOperationRequestOptions> = {
    startDate: today.toDate(),
    endDate: today.add(1, 'hour').toDate(),
    amount: 1,
};

const minDate = dayjs('07-16-2023 00:00:00', 'MM-DD-YYYY HH:mm:ss');
const maxDate = dayjs('07-24-2023 03:00:00', 'MM-DD-YYYY HH:mm:ss');

export const GenerateProfit = () => {
  const methods = useForm<StockOperationRequestOptions>({ defaultValues });
  const { handleSubmit, control, setValue } = methods;
  const {
    mutateAsync: createMaxSolution,
    error: createError,
    isError: isErrorCreate,
    isLoading: isLoadingCreate,
  } = useGetMaxSolution();

  const {
    mutateAsync: createAllSolution,
    error: createAllError,
    isError: isErrorAllCreate,
    isLoading: isLoadingAllCreate,
  } = useGetAllSolutions();
  const error = createError || createAllError;
  const [solutions, setSolution] = useState<StockOperationDisplayOptions[]>();

  const handleRequestSolution = async (request: StockOperationRequestOptions) => {
    const solution = await createMaxSolution(request);
    if (solution) {
      setSolution(solution);
    }
  };

  const handleRequestAllSolutions = async (request: StockOperationRequestOptions) => {
    const solution = await createAllSolution(request);
    if (solution) {
      setSolution(solution);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', padding: 3 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Request options</Typography>
              </Grid>
              <Grid item xs={4}>
                <DateTimePicker 
                  label="Start Date"
                  views={['year', 'day', 'hours', 'minutes', 'seconds']}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={(newValue: any) => setValue('startDate', newValue.toDate())}
                />
              </Grid>
              <Grid item xs={4}>
                <DateTimePicker
                  label="End Date"
                  views={['year', 'day', 'hours', 'minutes', 'seconds']}
                  minDate={minDate.add(1, 'second')}
                  maxDate={maxDate}
                  onChange={(newValue: any) => setValue('endDate', newValue.toDate())}
                />
              </Grid>
              <Grid item xs={4}>
                <ControlledTextField
                  fullWidth
                  label="Amount to trade"
                  type="number"
                  inputProps={{ min: 1, max: 5, step: 1, readOnly: false }}
                  transform={{
                    input(v: number) {
                      return String(v);
                    },
                    output(v: string) {
                      return parseInt(v);
                    },
                  }}
                  controllerProps={{
                    name: 'amount',
                    control,
                    defaultValue: 1,
                    rules: {
                      min: { value: 1, message: 'Min position is 1' },
                      max: { value: 1000, message: 'Max position is 1000' },
                    },
                  }}
                />
              </Grid>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid item xs={4}>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      loading={isLoadingCreate}
                      onClick={handleSubmit((formValues) => handleRequestSolution(formValues))}
                    >
                      Request max solution
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingButton
                      variant="outlined"
                      color="primary"
                      loading={isLoadingAllCreate}
                      onClick={handleSubmit((formValues) => handleRequestAllSolutions(formValues))}
                    >
                      Request all max solutions
                    </LoadingButton>
                  </Grid>
              </Grid>
            </Grid>
            {(isErrorCreate || isErrorAllCreate) && (
              <Box sx={{ padding: 2 }}>
                <Alert severity="error">{String(error)}</Alert>
              </Box>
            )}
          </Box>
        </Paper>
      </FormProvider>
      {solutions && <CalculatorDisplayOptions solutions={solutions} />}
    </>
    
  );
};