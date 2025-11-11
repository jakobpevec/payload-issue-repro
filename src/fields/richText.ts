import {
    BoldFeature,
    FixedToolbarFeature,
    HeadingFeature,
    lexicalEditor,
    ParagraphFeature,
    ItalicFeature,
    AlignFeature,
    UnorderedListFeature,
    OrderedListFeature,
    BlocksFeature,
    TextStateFeature,
    HorizontalRuleFeature,
    EXPERIMENTAL_TableFeature,
    LinkFeature, BlockquoteFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'


type RichTextTypes = 'basic' | 'advanced' | 'heading' | 'keyvisual'

interface RichTextOptions {
    maxLength?: number | null
    overrideBlocks?: Block[]
    additionalBlocks?: Block[]
}

export function richText(type: RichTextTypes = 'basic', options?: RichTextOptions) {
    const { maxLength = null, overrideBlocks = [], additionalBlocks = [] } = options || {}
    let features: any

    return lexicalEditor({
        features: ({ defaultFeatures: _defaultFeatures, rootFeatures: _rootFeatures }) => {
            switch (type) {
                case 'basic':
                    features = [
                        FixedToolbarFeature(),
                        ParagraphFeature(),
                        BoldFeature(),
                        ItalicFeature(),
                        LinkFeature({ enabledCollections: ['pages'] }),
                    ]
                    return features
                case 'heading':
                    features = [
                        FixedToolbarFeature(),
                        BoldFeature(),
                        ItalicFeature(),
                        HeadingFeature({
                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                        }),
                        AlignFeature(),
                        textStateFeature,
                    ]
                    return features
                case 'keyvisual':
                    features = [
                        FixedToolbarFeature(),
                        BoldFeature(),
                        ItalicFeature(),
                        ParagraphFeature(),
                        HeadingFeature({
                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                        }),
                        textStateFeature,
                        BlocksFeature({
                            blocks:
                                overrideBlocks.length > 0
                                    ? overrideBlocks
                                    : [...additionalBlocks],
                            inlineBlocks: [],
                        }),
                    ]
                    return features
                case 'advanced':
                    features = [
                        FixedToolbarFeature(),
                        BlockquoteFeature(),
                        ParagraphFeature(),
                        HeadingFeature({
                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                        }),
                        BoldFeature(),
                        ItalicFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        HorizontalRuleFeature(),
                        LinkFeature({ enabledCollections: ['pages'] }),
                        EXPERIMENTAL_TableFeature(),
                        BlocksFeature({
                            blocks:
                                overrideBlocks.length > 0
                                    ? overrideBlocks
                                    : [
                                        ...additionalBlocks,
                                    ],
                            inlineBlocks: [],
                        }),
                        AlignFeature(),
                        textStateFeature,
                    ]
                    return features
            }
        },
    })
}

const textStateFeature = TextStateFeature({
    state: {
        size: {
            h1: {
                css: {
                    'font-size': 'var(--faux-h1)',
                },
                label: 'Faux h1',
            },
            h2: {
                css: {
                    'font-size': 'var(--faux-h2)',
                },
                label: 'Faux h2',
            },
            h3: {
                css: {
                    'font-size': 'var(--faux-h3)',
                },
                label: 'Faux h3',
            },
            h4: {
                css: {
                    'font-size': 'var(--faux-h4)',
                },
                label: 'Faux h4',
            },
            h5: {
                css: {
                    'font-size': 'var(--faux-h5)',
                },
                label: 'Faux h5',
            },
            h6: {
                css: {
                    'font-size': 'var(--faux-h6)',
                },
                label: 'Faux h6',
            },
            p: {
                css: {
                    'font-size': 'var(--faux-p)',
                },
                label: 'Faux p',
            },
            lead: {
                css: {
                    'font-size': 'var(--faux-lead)',
                },
                label: 'Lead',
            },
        },
    },
})
