import type { Block } from 'payload'

export const Download: Block = {
    slug: 'download',
    admin: {
        group: { sl: 'Interaktivni gradniki', en: 'Interactive blocks' },
    },
    interfaceName: 'DownloadBlock',
    labels: {
        singular: {
            sl: 'Prenos',
            en: 'Download',
        },
        plural: {
            sl: 'Prenosi',
            en: 'Downloads',
        },
    },
    fields: [
        {
            name: 'download',
            type: 'upload',
            label: {
                sl: 'Prenos',
                en: 'Download',
            },
            relationTo: 'media',
            required: true,
            hasMany: true,
            filterOptions: {
                type: {
                    equals: 'file',
                },
            },
            admin: {
                isSortable: true,
            },
        },
    ],
}
