import React from 'react';

export const AppTitle = props => {
  const { title = 'default', subTitle = 'Hey! I am the sub!' } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
};
