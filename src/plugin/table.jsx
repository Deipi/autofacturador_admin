import React from 'react';

export default({ TableHeading, NoResults, style, className, visibleRows, Row, visibleRowIds }) => {
	if (visibleRows > 0) {
		return (
			<table style={ style } className={ className }>
				{ TableHeading && <TableHeading /> }
				{ visibleRowIds && visibleRowIds.map(r => <Row key={ r } griddleKey={ r } />) }
			</table>
		);
	}
	return (
		<NoResults />
	);
};

