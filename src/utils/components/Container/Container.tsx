/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import React, { FC } from 'react';
import classes from './Container.module.scss';

type PropsType = {
  className?: string;
  wrapperClassName?: string;
}

const Container: FC<PropsType> = ({ children, className, wrapperClassName }) => {
  const poop = 0;
  return (
    <div className={clsx(classes.root, wrapperClassName)}>
      <div className={clsx(classes.content, className)}>
        { children }
      </div>
    </div>
  );
};

export default Container;
