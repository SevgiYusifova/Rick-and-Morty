import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row';

const CollapsibleTable = (props) => {
    const {columns, rows} = props

    return (
        <TableContainer component={Paper} style={{maxHeight: '75vh'}}>
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((col) => <TableCell align="left">{col.toUpperCase()}</TableCell>)}
                {/* <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} columns={columns} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default CollapsibleTable 