import type {Block} from 'payload'
import link from "@/fields/link";

export const Button: Block = {
    slug: 'button',
    admin: {
        group: {sl: 'Interaktivni gradniki', en: 'Interactive blocks'},
    },
    interfaceName: 'ButtonBlock',
    labels: {
        singular: {
            sl: 'Button',
            en: 'Button'
        },
        plural: {
            sl: 'Button',
            en: 'Button'
        },
    },
    fields: [
        link()
    ],
}