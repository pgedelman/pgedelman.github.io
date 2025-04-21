import React, { ReactNode } from 'react';
import '../styles/Grid.css';

function Grid({ children }: {children: ReactNode[]}) {
  return <div className="grid-container">{children}</div>;
}

export default Grid;