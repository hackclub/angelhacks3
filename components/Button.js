import React from 'react';

function Button(props) {
  const { url, label } = props;

  return (
    <a href={url}><button className="button">
		{label}
	</button></a>
  );
}

export default Button;
