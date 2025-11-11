import type { Block } from 'payload'
import {Content} from "@/blocks/Content";

export const Section: Block = {
    slug: 'section',
    admin: {
        group: { sl: 'Strukturni gradniki', en: 'Structure blocks' },
    },
    interfaceName: 'SectionBlock',
    labels: {
        singular: {
            sl: 'Sekcija',
            en: 'Section',
        },
        plural: {
            sl: 'Sekcije',
            en: 'Sections',
        },
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: { sl: 'Vsebina', en: 'Content' },
                    fields: [
                        {
                            name: 'content',
                            type: 'blocks',
                            label: {
                                sl: 'Vsebina',
                                en: 'Content',
                            },
                            blocks: [Content],
                        },
                    ],
                },
                {
                    label: { sl: 'Nastavitve', en: 'Config' },
                    fields: [
                        {
                            name: 'status',
                            type: 'radio',
                            label: {
                                sl: 'Status',
                                en: 'Status',
                            },
                            defaultValue: 'enabled',
                            options: [
                                {
                                    label: {
                                        sl: 'Omogočeno',
                                        en: 'Enabled',
                                    },
                                    value: 'enabled',
                                },
                                {
                                    label: {
                                        sl: 'Onemogočeno',
                                        en: 'Disabled',
                                    },
                                    value: 'disabled',
                                },
                            ],
                        },
                        {
                            name: 'anchor',
                            type: 'text',
                            label: {
                                sl: 'Sidro',
                                en: 'Anchor',
                            },
                        },
                        {
                            name: 'background',
                            type: 'radio',
                            label: {
                                sl: 'Ozadje',
                                en: 'Background',
                            },
                            defaultValue: 'lightGray',
                            options: [
                                {
                                    label: {
                                        sl: 'Belo',
                                        en: 'White',
                                    },
                                    value: 'white',
                                },

                                {
                                    label: {
                                        sl: 'Svetlo Sivo',
                                        en: 'Light Gray',
                                    },
                                    value: 'lightGray',
                                },
                                {
                                    label: {
                                        sl: 'Temno Sivo',
                                        en: 'Dark Gray',
                                    },
                                    value: 'darkGray',
                                },
                                {
                                    label: {
                                        sl: 'Temno modro',
                                        en: 'Dark Blue',
                                    },
                                    value: 'darkBlue',
                                },
                                {
                                    label: {
                                        sl: 'Po meri',
                                        en: 'Custom',
                                    },
                                    value: 'custom',
                                },
                                {
                                    label: {
                                        sl: 'Slika',
                                        en: 'Background Image',
                                    },
                                    value: 'image',
                                },
                            ],
                        },
                        {
                            name: 'customBgColor',
                            type: 'text',
                            label: {
                                sl: 'Barva ozadja po meri',
                                en: 'Custom background color',
                            },
                            admin: {
                                condition: (_, siblingData) => siblingData.background === 'custom',
                                description: {
                                    sl: 'V HEX formatu (npr. #acacac)',
                                    en: 'In HEX format (ie. #acacac)',
                                },
                            },
                        },
                        {
                            name: 'backgroundImage',
                            type: 'upload',
                            label: {
                                sl: 'Slika ozadja',
                                en: 'Background Image',
                            },
                            relationTo: 'media',
                            admin: {
                                condition: (_, siblingData) => siblingData.background === 'image',
                            },
                        },
                        {
                            name: 'width',
                            type: 'radio',
                            label: {
                                sl: 'Širina',
                                en: 'Width',
                            },
                            defaultValue: 'wrap',
                            options: [
                                {
                                    label: {
                                        sl: 'Polna širina',
                                        en: 'Full width',
                                    },
                                    value: 'fullwidth',
                                },
                                {
                                    label: {
                                        sl: 'Običajna širina vsebine',
                                        en: 'Content width',
                                    },
                                    value: 'wrap',
                                },
                                {
                                    label: {
                                        sl: 'Ožja širina vsebine',
                                        en: 'Narrow content',
                                    },
                                    value: 'wrap-small',
                                },
                                {
                                    label: {
                                        sl: 'Zelo ožja širina vsebine',
                                        en: 'Extra narrow content',
                                    },
                                    value: 'wrap-xsmall',
                                },
                            ],
                        },
                        {
                            name: 'hasInnerContainer',
                            label: {
                                sl: 'Obdrži vsebino na širini containerja',
                                en: 'Keep content inside an inner container with container width',
                            },
                            type: 'checkbox',
                            defaultValue: false,
                            admin: {
                                condition: (_, siblingData) => {
                                    return siblingData.width === 'fullwidth'
                                },
                            },
                            hooks: {
                                afterRead: [
                                    ({ siblingData }) => {
                                        if (siblingData.width !== 'fullwidth') {
                                            return null
                                        }
                                    },
                                ],
                            },
                        },
                        {
                            name: 'innerWidth',
                            type: 'radio',
                            label: {
                                sl: 'Notranja širina',
                                en: 'Inner Width',
                            },
                            defaultValue: 'wrap',
                            options: [
                                {
                                    label: {
                                        sl: 'Polna širina',
                                        en: 'Full width',
                                    },
                                    value: 'fullwidth',
                                },
                                {
                                    label: {
                                        sl: 'Običajna širina vsebine',
                                        en: 'Content width',
                                    },
                                    value: 'wrap',
                                },
                                {
                                    label: {
                                        sl: 'Ožja širina vsebine',
                                        en: 'Narrow content',
                                    },
                                    value: 'wrap-small',
                                },
                                {
                                    label: {
                                        sl: 'Zelo ožja širina vsebine',
                                        en: 'Extra narrow content',
                                    },
                                    value: 'wrap-xsmall',
                                },
                            ],
                            admin: {
                                condition: (_, siblingData) => {
                                    return siblingData.width === 'fullwidth' && siblingData.hasInnerContainer
                                },
                            },
                        },
                        {
                            name: 'mobilePadding',
                            label: {
                                sl: 'Dodaj padding levo/desno na mobilnih napravah',
                                en: 'Apply horizontal padding on mobile',
                            },
                            type: 'checkbox',
                            defaultValue: false,
                            admin: {
                                condition: (_, siblingData) => {
                                    return siblingData.width === 'fullwidth' && !siblingData.hasInnerContainer
                                },
                            },
                            hooks: {
                                afterRead: [
                                    ({ siblingData }) => {
                                        if (siblingData.width !== 'fullwidth') {
                                            return null
                                        }
                                    },
                                ],
                            },
                        },
                        {
                            name: 'hasPadding',
                            label: {
                                sl: 'Ima padding zgoraj/spodaj',
                                en: 'Has vertical padding',
                            },
                            type: 'checkbox',
                            defaultValue: true,
                        },
                        {
                            name: 'hasTopPadding',
                            label: {
                                sl: 'Ima padding zgoraj',
                                en: 'Has top padding',
                            },
                            type: 'checkbox',
                            defaultValue: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.hasPadding,
                            },
                        },
                        {
                            name: 'hasBottomPadding',
                            label: {
                                sl: 'Ima padding spodaj',
                                en: 'Has bottom padding',
                            },
                            type: 'checkbox',
                            defaultValue: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.hasPadding,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
