import React from 'react';

const Title = ({ team1, team2, stadium, city, state, day, date, time }) => {
  return (
    <div>
      <h2 style={h2Style}>
        {team1} vs {team2}
      </h2>
      <h3 style={h3Style}>
        {stadium} • {city}, {state} • {day}, {date} at {time}
      </h3>
      <hr style={hrStyle} />
    </div>
  );
};

const h2Style = {
  font: 'arial',
  fontSize: '20px',
  fontWeight: 700,
};

const h3Style = {
  font: 'arial',
  fontSize: '15px',
  fontWeight: 400,
  marginTop: '-10px',
};

const hrStyle = {
  borderTop: '1px solid grey',
};

export default Title;
