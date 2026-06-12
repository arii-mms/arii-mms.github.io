import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter({
                pages: 'build',
                assets: 'build',
                fallback: '404.html'
            }),
            paths: {
                base: process.env.NODE_ENV === 'production' ? '/arii-mms.github.io' : ''
            },
            preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
            extensions: ['.svelte', '.svx', '.md']
        })
    ],
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.config.js',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
                }
            }
        ]
    }
});