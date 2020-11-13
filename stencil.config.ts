import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import { OutputTargetCopy } from '@stencil/core/internal';

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
    excludeUnusedDependencies: true,
    // buildEs5: false,
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
    // commonjs: {
    // include: '/home/milottit/Libraries/Util/**/node_modules/**/*.js', // /Libraries\/Util\/(.*)\/node_modules/,
    //     namedExports: {
    //         // '../../Util/util/node_modules/.pnpm/ts-util-is@1.1.3/node_modules/ts-util-is/dist/index.js': [ 'isUndefined', 'isNull' ],
    //         '../../Util/util/node_modules/.pnpm/registry.npmjs.org/colors/1.4.0/node_modules/colors/lib/colors.js': [ 'isUndefined', 'isNull' ],
    //     }
    // },
    /* commonjs: {
        include: [ /node_modules/, /lib-esm/ ],
        namedExports: {
            '../../Util/util/node_modules/.pnpm/ts-util-is@1.1.3/node_modules/ts-util-is/dist/index.js': [ 'isUndefined', 'isDefined', 'isNull' ],
            '../../Util/util/lib-esm/is.js': [ 'isUndefined', 'isDefined', 'isNull' ],
            '/home/milottit/Libraries/Util/util/lib-esm/is.js': [ 'isUndefined', 'isDefined', 'isNull' ],
        },
        transformMixedEsModules: false
    } as any, */
    globalStyle: 'src/global/global.scss',
    globalScript: 'src/global/global.ts',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
            copy: [
                { src: 'fonts/*.woff2', dest: 'static/fonts', warn: true }
            ]
        },
        {
            type: 'dist-custom-elements-bundle',
        },
        {
            type: 'docs-readme'
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
            copy: [
                { src: 'fonts/*.woff2', dest: 'static/fonts', warn: true }
            ]
        }
    ]
};

const isDev = process.argv.some(arg => arg === '--dev');

if (isDev) {
    for (const target of config.outputTargets.filter(target => (target as OutputTargetCopy).copy)) {
        (target as OutputTargetCopy).copy.push(
            { src: 'test-components/*', dest: 'static/test/html', warn: true },
            { src: 'global/tilda*.css', dest: 'static/test/css', warn: true },
        );
    }
}
