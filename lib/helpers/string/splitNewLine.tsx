import { Fragment } from 'react';

export const splitNewLine = (text?: string) => {
  return text?.split('\n').map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
};
