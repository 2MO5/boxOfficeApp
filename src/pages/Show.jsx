import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getShowById } from '../api/tvmaze';
import ShowMainData from '../components/shows/ShowMainData';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import Casts from '../components/shows/Casts';
import { TextCenter } from '../components/common/TextCenter';
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
      <ShowPageWrapper>
        <BackHomeWrapper>
          <Link to="/">Go Back</Link>
        </BackHomeWrapper>
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
      </ShowPageWrapper>
    );
  }

  return <TextCenter>data is loading for show {showId}</TextCenter>;
};

const BackHomeWrapper = styled.div`
  margin-bottom: 30px;
  text-align: left;
  a {
    padding: 10px;
    color: ${({ theme }) => theme.mainColors.dark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;
  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
