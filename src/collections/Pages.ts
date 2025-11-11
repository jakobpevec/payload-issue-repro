import {CollectionConfig} from "payload";
import {Section} from "@/blocks/Section";

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'createdAt', 'updatedAt'],
        group: '',
    },
    versions: {
        drafts: true,
        maxPerDoc: 100
    },
    folders: true,
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'sections',
            type: 'blocks',
            blocks: [Section]
        }
    ],
}