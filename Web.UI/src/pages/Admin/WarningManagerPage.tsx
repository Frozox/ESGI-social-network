import { Table } from '../../components/Table';
import { GridColDef } from "@mui/x-data-grid";
import { Dashboard } from "../../components/Dashboard";

const WarningManagerPage = () => {
    const columns: GridColDef[] = [
        { headerName: 'Prenom', field: 'name', flex: 1, align: 'left' },
        { headerName: 'Nom', field: 'lastname', flex: 1, align: 'left' },
        { headerName: 'Email', field: 'email', flex: 1, align: 'left' },
        {
            headerName: 'Actions', field: 'actions', flex: 1, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        },
    ]

    const data = [
        { id: 1, name: 'John', lastname: 'Doe', email: 'test' },
        { id: 2, name: 'John', lastname: 'Doe', email: 'rtyu' },
        { id: 3, name: 'John', lastname: 'Doe', email: 'rtyu' },
        { id: 4, name: 'John', lastname: 'Doe', email: 'rtyu' },
        { id: 5, name: 'John', lastname: 'Doe', email: 'rtyu' },
        { id: 6, name: 'John', lastname: 'Doe', email: 'rtyu' },
    ]

    return (
        <div className="h-screen flex w-full bg-[url('./assets/images/bg.jpeg')] bg-cover">
            <Dashboard>
                <Table
                    data={data}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                    onRowClick={() => { }}
                />
            </Dashboard>
        </div>
    );
}

export default WarningManagerPage;