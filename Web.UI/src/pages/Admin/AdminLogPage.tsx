import { GridColDef } from "@mui/x-data-grid"; import { Dashboard } from "../../components/Dashboard";
import { Table } from "../../components/Table";

const AdminLogPage = () => {

    const columns: GridColDef[] = [
        { headerName: 'Status', field: 'status', width: 200, align: 'left' },
        { headerName: 'Message', field: 'message', width: 200, align: 'left' },
        { headerName: 'Type Erreur', field: 'typeErreur', width: 200, align: 'left' },
        { headerName: 'Origin', field: 'origin', width: 200, align: 'left' },
        {
            headerName: 'Actions', field: 'actions', width: 100, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        },
    ]

    const data = [
        { id: 1, status: 400, message: 'Bad Request', typeErreur: 'Bad Request', origin: 'API' },
        { id: 2, status: 401, message: 'Unauthorized', typeErreur: 'Unauthorized', origin: 'API' },
        { id: 3, status: 403, message: 'Forbidden', typeErreur: 'Forbidden', origin: 'API' },
        { id: 4, status: 404, message: 'Not Found', typeErreur: 'Not Found', origin: 'API' },
        { id: 5, status: 405, message: 'Method Not Allowed', typeErreur: 'Method Not Allowed', origin: 'API' },
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
                />
            </Dashboard>
        </div>
    );
}

export default AdminLogPage