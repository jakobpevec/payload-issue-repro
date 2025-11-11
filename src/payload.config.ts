// storage-adapter-import-placeholder
import {payloadCloudPlugin} from '@payloadcms/payload-cloud'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import { en } from '@payloadcms/translations/languages/en'
import { sl } from '@payloadcms/translations/languages/sl'
import sharp from 'sharp'

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Pages} from "@/collections/Pages";
import {mongooseAdapter} from "@payloadcms/db-mongodb";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        autoLogin: {
            email: 'user@domain.com',
            password: 'test1234'
        }
    },
    i18n: {
        supportedLanguages: { sl, en },
        fallbackLanguage: 'en',
    },
    localization: {
        defaultLocale: 'sl',
        locales: [
            { label: 'Slovenščina', code: 'sl' },
            { label: 'Angleščina', code: 'en' },
        ],
        fallback: true,
    },
    collections: [Pages, Users, Media],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    plugins: [
        payloadCloudPlugin(),
        // storage-adapter-placeholder
    ],
})
