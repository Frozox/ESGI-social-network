import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { Fragment } from "react";
import { io } from "socket.io-client";
import { getLogs } from "../../api/logs.axios";
import { Dashboard } from "../../components/Dashboard";
import { useModalContext } from "../../components/modal";
import { Table } from "../../components/Table";
import { formatSeverity } from "../../utils/helpers/jsxhelpers";

interface LogsProps {
    severity: number
    content: string
    createdAt: moment.MomentInput
    sourceIsServer: boolean
    _id: any
}

const AdminLogPage = () => {
    const { openModal, updateModalContent, updateModalTitle } = useModalContext()
    const [logs, setlogs] = React.useState<any[]>([]);
    const socket = (io('http://localhost:3000', {
        'query': {
            'ns': '/admin/logs'
        }
    }))

    React.useEffect(() => {
        getLogs().then(res => {
            setlogs(res.map((log: any) => ({
                id: log._id,
                severity: log.severity,
                content: log.content,
                createdAt: moment(log.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                origin: log.sourceIsServer ? 'Server' : 'Client',
                urgency: log.severity
            }))
            )
        })
    }, [])

    React.useEffect(() => {
        socket.on("logs:read", (log: LogsProps) => {
            setlogs(logs => [{
                severity: log.severity,
                content: log.content,
                createdAt: moment(log.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                origin: log.sourceIsServer ? 'Server' : 'Client',
                id: log._id,
                urgency: log.severity
            }, ...logs])
        })
    }, []);

    const columns: GridColDef[] = [
        {
            headerName: 'Sévérité', field: 'severity', width: 100, align: 'left', renderCell: (params: any) => {
                return formatSeverity(params.value)
            }
        },
        { headerName: 'Contenu', field: 'content', flex: 1, align: 'left' },
        { headerName: 'Date de création', field: 'createdAt', flex: 1, align: 'left' },
        { headerName: 'Origin', field: 'origin', flex: 1, align: 'left' },
    ]

    const handleMoreInfoModal = (log: any) => {
        updateModalTitle(`Informations sur le log`)
        updateModalContent(
            <Fragment>
                <div className="flex flex-col">
                    <div><span className="font-bold underline">Sévérité : </span><span>{log.severity}</span></div>
                    <div><span className="font-bold underline">Contenu : </span><span>{log.content}</span></div>
                    <div><span className="font-bold underline">Date de création : </span><span>{log.createdAt}</span></div>
                    <div><span className="font-bold underline">Origin : </span><span>{log.origin}</span></div>
                </div>
            </Fragment>
        )
        openModal()
    }

    return (
        <div className="h-screen flex w-full bg-[url('./assets/images/bg.jpeg')] bg-cover">
            <Dashboard>
                <Table
                    data={logs.filter((log, index, self) => {
                        return index === self.findIndex(l => l.id === log.id)
                    })}
                    header={columns}
                    pageSize={30}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                    onRowClick={handleMoreInfoModal}
                />
            </Dashboard>
        </div>
    );
}

export default AdminLogPage