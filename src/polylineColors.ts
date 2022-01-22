function getTaskColor(taskName: string) {
    switch (taskName) {
        case 'BRUSHING':
            return '#FF0000'
        case 'BRUSH_CLEARING':
            return '#FF7E00'
        case 'CRACK_FILLING':
            return '#FFDE00'
        case 'DITCHING':
            return '#D6FF00'
        case 'LINE_SANDING':
            return '#16FF00'
        case 'LOWERING_OF_SNOWBANKS':
            return '#00FFD1'
        case 'OTHER':
            return '#0090FF'
        case 'PATCHING':
            return '#000DFF'
        case 'PAVING':
            return '#7600FF'
        case 'PLOUGHING_AND_SLUSH_REMOVAL':
            return '#CD00FF'
        case 'REMOVAL_OF_BULGE_ICE':
            return '#FF00F0'
        case 'ROAD_INSPECTIONS':
            return '#FF007E'
        case 'ROAD_MARKINGS':
            return '#FF4061'
        case 'SALTING':
            return '#0091ff'
        case 'SPOT_SANDING':
            return '#B15EFF'
        case 'SPREADING_OF_CRUSH':
            return '#876800'
        case 'TRANSFER_OF_SNOW':
            return '#FE9261'
        case 'UNKNOWN':
            return '#0900FF'
        default:
            return '#0900FF'
    }
}

export { getTaskColor }