import { nanoid } from 'nanoid';
import { capitalize } from '@mui/material';
import React, { FC } from 'react';
import { Color } from 'romcal';

export const SingleColor = (props: { color: Color }) => {
  const { color } = props;
  return (
    <>
      <span className={`color-ship ${color.toLowerCase()}`} />
      {capitalize(color.toLowerCase())}
    </>
  );
};

const Colors: FC<{ colors: Color[] }> = ({ colors }) => {
  return colors.map((color, index) => {
    const id = `color-${index}-${nanoid(6)}`;
    return (
      <span key={id}>
        {index > 0 ? ', ' : ''}
        <SingleColor key={color} color={color} />
      </span>
    );
  });
};

export default Colors;
