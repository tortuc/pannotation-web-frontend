import { Injectable } from '@angular/core';

import { Renderer, Slugger } from 'marked';

const removeMarkdown = require('remove-markdown');

@Injectable()
export class MarkedService {
    public get renderer (): Renderer {
        const renderer = new Renderer();

        renderer.heading = MarkedService.heading;
        renderer.link = MarkedService.link;

        return renderer;
    }

    private static heading (text: string, level: number, raw: string, slugger: Slugger): string {
        return `<h${level} class="typography-heading-lvl-${level}">
            ${text}
        </h${level}>`;
    }

    private static link (href: string, title: string, text: string): string {
        return `<a class="link link--orange" href="${href}">
            ${text}
        </a>`;
    }

    // noinspection JSMethodCanBeStatic
    public toPlainText (mdText: string): string {
        return removeMarkdown(mdText, {
            stripListLeaders: true,
        });
    }
}
