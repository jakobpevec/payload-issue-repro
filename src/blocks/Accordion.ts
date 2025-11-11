import type { Block } from 'payload'
import { richText } from '@/fields/richText'
import { Warning } from '@/blocks/Warning'
import {Spacer} from "@/blocks/Spacer";
import {Button} from "@/blocks/Button";

export const Accordion: Block = {
    slug: 'accordion',
    admin: {
        group: { sl: 'Vsebinski gradniki', en: 'Content blocks' },
    },
    interfaceName: 'AccordionBlock',
    labels: {
        singular: {
            sl: 'Accordion',
            en: 'Accordion',
        },
        plural: {
            sl: 'Obvestila',
            en: 'Accordions',
        },
    },
    fields: [
        {
            name: 'accordion-items',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'content',
                    type: 'richText',
                    required: true,
                    editor: richText('advanced', {
                        additionalBlocks: [Warning,Spacer,Button],
                    }),
                },
            ],
        },
    ],
}
