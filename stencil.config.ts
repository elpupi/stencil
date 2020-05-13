import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';

/* import includePaths from 'rollup-plugin-includepaths';

const includePathOptions = {
    include: {
        '@upradata/util': 'node_modules/@upradata/util/lib-esm/index.js'
    },
    // paths: [ 'src/lib', 'src/other' ],
    external: [],
    extensions: [ '.mjs', '.js', '.json', '.html' ]
}; */

export const config: Config = {
    namespace: 'upradata',
    taskQueue: 'async',
    plugins: [
        // includePaths(includePathOptions),
        sass(),
        postcss({
            /* injectGlobalPaths: [ // The injectGlobalPaths config is an array of paths that automatically get added as @import declarations to all components.
                'src/globals/variables.pcss',
                'src/globals/mixins.pcss'
            ], */
            plugins: [ autoprefixer(/* {
                browsers: [ 'last 6 versions' ],
                cascade: false
            } */) ]
        })
    ],
    commonjs: {
        namedExports: {
            '../../Util/util/node_modules/.pnpm/registry.npmjs.org/ts-util-is/1.1.3/node_modules/ts-util-is/dist/index.js': [ 'isUndefined', 'isNull' ]
        }
    },
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
