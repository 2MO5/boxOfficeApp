import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getShowById } from '../../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
import ShowMainData from './ShowMainData';
import Details from './Details';
import Seasons from './Seasons';
import Casts from './Casts';
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
    refetchOnWindowFocus: false,
  });

  // const navigateTo = useNavigate();

  // const onGoBack = () => {
  //   navigateTo('/');
  // };

  if (showError) {
    return <div> We have an error!! {showError.message}</div>;
  }
  if (showData) {
    console.log('@46: ', showData);
    return (
      <div>
        <Link to="/">Go Back</Link>
        {/* <button type="button" onClick={onGoBack}>
          Go Back
        </button> */}
        <ShowMainData
          image={showData.image}
          name={showData.name}
          summary={showData.summary}
          rating={showData.rating}
          genres={showData.genres}
        />
        <h2>Details</h2>
        <Details
          status={showData.status}
          network={showData.network}
          premiered={showData.premiered}
        />

        <h2>Seasons</h2>
        <Seasons seasons={showData._embedded.seasons} />

        <h2>Casts</h2>
        <Casts cast={showData._embedded.cast} />
      </div>
    );
  }

  return <div>data is loading for show {showId}</div>;
};
