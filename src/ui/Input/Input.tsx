/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: {(value: any): void}
}

const Input: FC<IProps> = (props) => {
  const memoOnChange = useCallback(onChange, [props]);
  return (
    <input
      {...props}
      onChange={memoOnChange}
    />
  );
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }
};

export default Input;
