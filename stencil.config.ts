import { Config, Build } from '@stencil/core';
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

const isDev = process.argv.some(arg => arg === '--dev');

if (isDev) {
    config.copy.push(
        { src: 'test-components/*', dest: 'static/test/html', warn: true },
        { src: 'global/tilda*.css', dest: 'static/test/css', warn: true },
    );
}
