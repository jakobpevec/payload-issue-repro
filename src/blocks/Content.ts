import type {Block} from 'payload'
import {Accordion} from "@/blocks/Accordion";
import {Warning} from "@/blocks/Warning";
import {richText} from "@/fields/richText";
import {Spacer} from "@/blocks/Spacer";
import {Button} from "@/blocks/Button";
import {Download} from "@/blocks/Download";

export const Content: Block = {
    slug: 'content',
    fields: [
        {
            name: 'content',
            type: 'richText',
            label: {
                sl: 'Vsebina',
                en: 'Content',
            },
            editor: richText('advanced', {
                additionalBlocks: [Warning, Accordion,Spacer,Button,Download],
            }),
        },
    ],
}