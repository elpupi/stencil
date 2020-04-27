import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'upradata',
    taskQueue: 'async',
    plugins: [
        sass()
    ],
    globalStyle: 'src/global/global.scss',
    globalScript: 'src/global/global.ts',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader'
        },
        {
            type: 'docs-readme'
        },
        {
            type: 'www',
            serviceWorker: null // disable service workers
        }
    ],
    copy: [
        { src: 'fonts/*.woff2', dest: 'static/fonts', warn: true }
    ]
};
