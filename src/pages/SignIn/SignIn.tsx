import React, { FC } from 'react';
import classes from './SignIn.module.scss';

type PropsType = {

}

const SignIn: FC<PropsType> = () => {
  console.log('this is signin page');
  return (
    <div className={classes.root}>
      This Is SignIn Page
    </div>
  );
};

export default SignIn;
