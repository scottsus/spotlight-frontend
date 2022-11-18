import React from 'react';

const Title = ({ team1, team2, stadium, city, state, day, date, time }) => {
  return (
    <div style={titleStyles}>
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

const titleStyles = {
  height: '70px',
  width: '100%',
  paddingTop: '15px',
};

const h2Style = {
  font: 'arial',
  fontSize: '20px',
  fontWeight: 700,
  margin: '2px 0px',
};

const h3Style = {
  font: 'arial',
  fontSize: '15px',
  fontWeight: 400,
  margin: '2px 0px',
};

const hrStyle = {
  borderTop: '1px solid #D0D0D0',
  margin: '10px 0px',
};

export default Title;
