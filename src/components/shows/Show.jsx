import { useParams } from 'react-router-dom';

export const Show = () => {
  // const params = useParams();
  const { showId } = useParams();
  console.log(showId);
  return <div>Show {showId}</div>;
};
