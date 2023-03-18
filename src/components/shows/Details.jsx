import React from 'react';

const Details = props => {
  const { status, network, premiered } = props;

  return (
    <div>
      <p>Status: {status}</p>
      <p>
        Premiered {premiered} {!!network && `on ${network.name}`}
      </p>
    </div>
  );
};

export default Details;
