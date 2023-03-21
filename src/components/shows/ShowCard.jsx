import React from 'react';
import styled from 'styled-components';
import { SearchCard, SearchImgWrapper } from '../common/SearchCard';
import { StarIcon } from '../common/StarIcon';

export const ShowCard = ({
  name,
  image,
  id,
  summary,
  onStarMeClick,
  isStarred,
}) => {
  const strippedSummary = summary
    ? summary.split('').slice(0, 20).join('').replace(/<.+?>/g, '') + '....'
    : 'No description';

  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name} />
      </SearchImgWrapper>
      <h1>{name}</h1>
      <p>{strippedSummary}</p>
      <ActionSection>
        {/* Link is used for client side rendering/routing through react router */}
        {/* <Link to={`/show/${id}`}>Read More</Link> */}
        {/* Want to open the page in another tab (not related to client side rendering/routing)? Use the <a href! */}

        <a href={`/show/${id}`} target="_blank" rel="noreferrer">
          Read More
        </a>
        <StarBtn type="button" onClick={() => onStarMeClick(id)}>
          <StarIcon active={isStarred} />
          {/* {isStarred ? 'UnStar ME!' : 'Star ME!'} */}
        </StarBtn>
      </ActionSection>
    </SearchCard>
  );
};

const ActionSection = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration-color: #000;
    color: #000;
    &:hover {
      text-decoration-color: blue;
      color: blue;
    }
  }
`;

const StarBtn = styled.button`
  outline: none;
  border: 1px solid #8e8e8e;
  border-radius: 15px;
  padding: 5px 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
