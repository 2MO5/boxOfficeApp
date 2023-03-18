import React from 'react';

const Casts = ({ cast }) => {
  return (
    <div>
      {cast.map(({ person, character, voice }) => (
        <div key={person.id}>
          <div>
            <img
              src={person.image ? person.image.medium : './not-found-image.png'}
              alt="perons-image"
            />
          </div>

          <div>
            {/* {voice ? 'Voiceover' : ''}  equals to voice &&'Voiceover'*/}
            {person.name} | {character.name} {voice && ' | Voiceover'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Casts;
