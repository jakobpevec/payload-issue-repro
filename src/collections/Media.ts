import type {CollectionConfig} from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'image',
            options: [
                {value: 'image', label: 'Image'},
                {value: 'file', label: 'File'},
            ],
        },
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
    upload: true,
}
