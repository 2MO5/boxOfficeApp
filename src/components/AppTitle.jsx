import React from 'react';

export const AppTitle = props => {
  const {
    title = 'Box Office',
    subTitle = 'In search for a movie or an actor?',
  } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
};
