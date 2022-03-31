import React, { FC } from 'react';
import classes from './SignUp.module.scss';

type PropsType = {

}

const SignUp: FC<PropsType> = () => {
  console.log('this is signup page');
  return (
    <div className={classes.root}>
      This is SignUp Page
    </div>
  );
};

export default SignUp;
