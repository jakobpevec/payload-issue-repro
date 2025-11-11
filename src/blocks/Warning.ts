import type { Block } from 'payload'
import { richText } from '@/fields/richText'

export const Warning: Block = {
    slug: 'warning',
    admin: {
        group: { sl: 'Vsebinski gradniki', en: 'Content blocks' },
    },
    interfaceName: 'Warning',
    labels: {
        singular: {
            sl: 'Warning',
            en: 'Warning',
        },
        plural: {
            sl: 'Warnings',
            en: 'Warnings',
        },
    },
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'notice',
            options: [
                { value: 'notice', label: 'Notice' },
                { value: 'info', label: 'Info' },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'alert', label: 'Alert' },
            ],
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            editor: richText('basic'),
        },
    ],
}
