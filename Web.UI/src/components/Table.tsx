import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

interface TableProps {
    data: any;
    header: GridColDef[];
    pageSize?: number;
    rowsPerPageOptions?: number[];
    checkbox?: boolean;
    onRowClick: (row: any) => void;
    disableSelectionOnClick?: boolean;
    headerCustom?: boolean
}

export const Table = ({ data, pageSize, rowsPerPageOptions, checkbox, onRowClick, header, disableSelectionOnClick, headerCustom }: TableProps) => {
    return (
        <DataGrid
            columns={header}
            rows={data}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkbox}
            onRowClick={(e) => onRowClick(e.row)}
            disableSelectionOnClick={disableSelectionOnClick}
            style={headerCustom ? { height: '94%' } : {}}
        />
    )
}