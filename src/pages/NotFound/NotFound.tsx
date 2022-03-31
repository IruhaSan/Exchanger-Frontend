import React, { FC } from 'react';
import classes from './NotFound.module.scss';

type PropsType = {

}

const NotFound: FC<PropsType> = () => {
  console.log('this is not found page');
  return (
    <div className={classes.root}>
      This Is NotFound Page
    </div>
  );
};

export default NotFound;
