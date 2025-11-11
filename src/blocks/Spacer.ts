import type { Block } from 'payload'

export const Spacer: Block = {
    slug: 'spacer',
    admin: {
        group: { sl: 'Strukturni gradniki', en: 'Structure blocks' },
    },
    interfaceName: 'SpacerBlock',
    labels: {
        singular: {
            sl: 'Spacer',
            en: 'Spacer',
        },
        plural: {
            sl: 'Spacers',
            en: 'Spacers',
        },
    },
    fields: [
        {
            name: 'size',
            type: 'radio',
            label: {
                sl: 'Velikost',
                en: 'Size',
            },
            defaultValue: 'md',
            options: [
                {
                    label: 'S: 24px',
                    value: 'sm',
                },
                {
                    label: 'M: 36px',
                    value: 'md',
                },
                {
                    label: 'L: 48px',
                    value: 'lg',
                },
                {
                    label: 'XL: 64px',
                    value: 'xl',
                },
                {
                    label: '2XL: 84px',
                    value: '2xl',
                },
                {
                    label: '3XL: 96px',
                    value: '3xl',
                },
                {
                    label: '4XL: 104px',
                    value: '4xl',
                },
            ],
        },
    ],
}
