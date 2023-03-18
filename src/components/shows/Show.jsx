import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowById } from '../../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
// const useShowById = showId => {
//   const [showData, setShowData] = useState(null);
//   const [showError, setShowError] = useState(null);
//   console.log(showId);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getShowById(showId);
//         console.log('data: ', data);
//         setShowData(data);
//         console.log(showData);
//         console.log('showData: ', showData);
//       } catch (error) {
//         setShowError(error);
//         console.log(showError);
//       }
//     }

//     fetchData();
//   }, [showId]);

//   return { showData, showError };
// };

export const Show = () => {
  // const params = useParams();
  const { showId } = useParams();
  // const { showData, showError } = useShowById(showId);
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId], //this like the dependency array and it's the key identifier and onto which the useQuery is attached
    queryFn: () => getShowById(showId), //async await function call is this one
  });

  if (showError) {
    return <div> We have an error!! {showError.message}</div>;
  }
  if (showData) {
    return <div> The data we have: {showData.name}</div>;
  }

  return <div>data is loading for show {showId}</div>;
};
