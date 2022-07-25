import { Chip } from "@mui/material";

export const formatSeverity = (severity: number ) => {
    switch (severity) {
        case 0:
            return <Chip label="Emerg" className="w-full font-semibold" style={{ backgroundColor: '#f97316', color: 'white' }} />
        case 1:
            return <Chip label="Alert" className="w-full font-semibold" style={{ backgroundColor: '#f97316', color: 'white' }} />
        case 2:
            return <Chip label="Critical" className="w-full font-semibold" style={{ backgroundColor: '#ef4444', color: 'white' }} />
        case 3:
            return <Chip label="Error" className="w-full font-semibold" style={{ backgroundColor: '#ef4444', color: 'white' }} />
        case 4:
            return <Chip label="Warning" className="w-full font-semibold" style={{ backgroundColor: '#f97316', color: 'white' }} />
        case 5:
            return <Chip label="Notice" className="w-full font-semibold" style={{ backgroundColor: '#3b82f6', color: 'white' }} />
        case 6:
            return <Chip label="Info" className="w-full font-semibold" style={{ backgroundColor: '#3b82f6', color: 'white' }} />
        case 7:
            return <Chip label="Debug" className="w-full font-semibold" style={{ backgroundColor: '#22c55e', color: 'white' }} />
    }
}