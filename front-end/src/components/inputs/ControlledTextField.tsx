import { TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, PathValue } from 'react-hook-form';

interface ControlledTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T,
> {
  controllerProps: Omit<ControllerProps<TFieldValues, TName>, 'render'>;
  transform?: {
    input(v: T): string;
    output(v: string): ChangeEvent<Element> | PathValue<TFieldValues, TName>;
  };
}

export const ControlledTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T,
>({
  controllerProps,
  transform,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName, T> & TextFieldProps) => {
  return (
    <Controller
      render={({ field: { name, value, onChange, ref }, fieldState: { error } }) => (
        <TextField
          name={name}
          value={transform ? transform?.input(value) : value}
          onChange={
            transform ? e => onChange(transform.output(e.target.value)) : onChange
          }
          inputRef={ref}
          error={Boolean(error)}
          helperText={error?.message}
          {...props}
        />
      )}
      {...controllerProps}
    />
  );
};
