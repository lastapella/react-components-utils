import * as React from 'react';
import './helperText.css'
interface Props {
	children: React.ReactNode;
}

export default ({ children }: Props) => <p className="helper-text">{children}</p>;
