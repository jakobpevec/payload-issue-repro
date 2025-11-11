import type { Field, GroupField, AdminClient, Condition } from 'payload'
import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'primary' | 'secondary' | 'outline' | 'link'
export type LinkSizes = 'large' | 'small'

export type LinkTypeOptions = {
    appearances?: LinkAppearances[] | false
    sizes?: LinkSizes[] | false
    defaultAppearance?: LinkAppearances
    defaultSize?: LinkSizes
    label?: string
    disableLabel?: boolean
    overrides?: Partial<GroupField>
    isCollapsible?: boolean
    collapsibleAdminOptions?: {
        initCollapsed?: boolean
        condition?: Condition
    } & AdminClient
}

type LinkType = (options?: LinkTypeOptions) => Field

export const appearanceOptions: {
    [key in LinkAppearances]: {
        label: string
        value: LinkAppearances
    }
} = {
    primary: {
        label: 'Primary Button',
        value: 'primary',
    },
    secondary: {
        label: 'Secondary Button',
        value: 'secondary',
    },
    outline: {
        label: 'Outline Button',
        value: 'outline',
    },
    link: {
        label: 'Link Button',
        value: 'link',
    },
}

export const sizeOptions: {
    [key in LinkSizes]: {
        label: string
        value: LinkSizes
    }
} = {
    large: {
        label: 'Large',
        value: 'large',
    },
    small: {
        label: 'Small',
        value: 'small',
    },
}

const appearanceOptionsToUse = [
    appearanceOptions.primary,
    appearanceOptions.secondary,
    appearanceOptions.outline,
    appearanceOptions.link,
]
const sizeOptionsToUse = [
    sizeOptions.large,
    sizeOptions.small,
]

const link: LinkType = ({
                            appearances = Object.keys(appearanceOptions) as LinkAppearances[],
                            sizes = Object.keys(sizeOptions) as LinkSizes[],
                            defaultAppearance = Object.keys(appearanceOptions)[0] as LinkAppearances,
                            defaultSize = Object.keys(sizeOptions)[0] as LinkSizes,
                            label = 'Button',
                            disableLabel = false,
                            overrides = {},
                            isCollapsible = true,
                            collapsibleAdminOptions = { initCollapsed: true },
                        } = {}) => {
    const linkTypes: Field[] = [
        {
            name: 'reference',
            label: 'Document to link to',
            type: 'relationship',
            relationTo: ['pages'],
            filterOptions: ({ relationTo }): any => {
                if (relationTo === 'media') {
                    return {
                        'type': {
                            equals: 'file',
                        },
                    }
                }
            },
            required: true,
            maxDepth: 3,
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
            },
        },
        {
            name: 'url',
            label: 'Custom URL',
            type: 'text',
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
            },
        },
    ]

    const linkResult: Field = {
        name: 'link',
        type: 'group',
        localized: true,
        admin: {
            hideGutter: true,
            ...(overrides?.admin || {}),
        },
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'type',
                        type: 'radio',
                        options: [
                            {
                                label: 'Custom URL',
                                value: 'custom',
                            },
                            {
                                label: 'Internal link',
                                value: 'reference',
                            },
                        ],
                        defaultValue: 'custom',
                        admin: {
                            layout: 'horizontal',
                            width: '50%',
                        },
                    },
                    {
                        name: 'newTab',
                        label: 'Open in new tab',
                        type: 'checkbox',
                        admin: {
                            width: '50%',
                            style: {
                                alignSelf: 'flex-end',
                            },
                        },
                    },
                ],
            },
        ],
    }

    if (!disableLabel) {
        linkResult.fields.push({
            type: 'row',
            fields: [
                ...linkTypes,
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
            ],
        })
    } else {
        linkResult.fields = [...linkResult.fields, ...linkTypes]
    }

    const parsedAppearances = appearances ? appearances.map((appearance: LinkAppearances) => appearanceOptions[appearance]) : appearanceOptionsToUse
    const parsedSizes = sizes !== false ? sizes.map((size: LinkSizes) => sizeOptions[size]) : sizeOptionsToUse

    linkResult.fields.push({
        type: 'row',
        fields: [
            {
                name: 'appearance',
                type: 'select',
                defaultValue: defaultAppearance,
                options: parsedAppearances,
                admin: {
                    description: 'Choose how the button should be rendered.',
                    hidden: appearances === false,
                    width: '50%',
                },
            },
            {
                name: 'size',
                type: 'select',
                defaultValue: defaultSize,
                options: parsedSizes,
                admin: {
                    description: 'Choose button size.',
                    hidden: sizes === false,
                    width: '50%',
                },
            },
        ],
    })

    linkResult.fields.push({
        type: 'row',
        fields: [
            {
                name: 'triggerEvent',
                label: 'Trigger event?',
                type: 'checkbox',
                admin: {
                    width: '33%',
                    style: {
                        alignSelf: 'center',
                    },
                },
            },
            {
                name: 'eventName',
                label: 'Event name',
                type: 'text',
                admin: {
                    width: '66%',
                    style: {
                        alignSelf: 'center',
                    },
                    condition: (_, siblingData) => siblingData.triggerEvent,
                },
            },
        ],
    })

    if (isCollapsible) {
        return {
            label: label,
            type: 'collapsible',
            fields: [deepMerge(linkResult, overrides)],
            admin: collapsibleAdminOptions,
        }
    }

    return deepMerge(linkResult, overrides)

    // return deepMerge(linkResult, overrides)
}

export default link
