import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/lab';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

type NewDateTimePickerProps = Omit<
  DateTimePickerProps<dayjs.Dayjs>,
  'value' | 'renderInput' | 'onChange'
>;


type ControlledDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = NewDateTimePickerProps & {
  controllerProps: UseControllerProps<TFieldValues, TName>;
};

export const ControlledDateTimePicker = <T extends FieldValues, P extends FieldPath<T>>({
  controllerProps,
  ...props
}: ControlledDateTimePickerProps<T, P>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    ...controllerProps,
    rules: {
      ...controllerProps.rules,
    },
  });

  return (
    <DateTimePicker
      renderInput={(params: any) => (
        <TextField
          name={field.name}
          onBlur={field.onBlur}
          {...params}
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )}
      value={field.value}
      //onChange={datetime => field.onChange((datetime as dayjs.Dayjs).toDate())}
      {...props}
    />
  );
};
