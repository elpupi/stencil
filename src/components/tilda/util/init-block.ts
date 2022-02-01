import { guid } from '@upradata/browser-util';

export interface InitBlock {
    blockid: string;
    recid?: string;
    element?: HTMLElement;
}

export const findRec = (element: Element) => {
    let recEl: Element = element;

    while (recEl !== null) {
        if (recEl.id.startsWith('rec'))
            break;

        recEl = recEl.parentElement;
    }

    return recEl || undefined;
};


export type InitBlockFunc = (recid: string) => void;
export type GetInitBlockFunc = (blockid: string) => InitBlockFunc;

export const getInitBlockFunc: GetInitBlockFunc = blockid => {
    const funcName = `t${blockid}_init`;

    if (!window[ funcName ])
        console.warn(`Could not find "${funcName}" tilda init method ("blockid:" ${blockid})`);

    return window[ funcName ];
};

export const runInitBlock = (options: { recid: string; initBlock: InitBlockFunc; }) => {
    const recid = (options.recid || 'rec').replace(/^rec/, '');
    const errorMsg = `Could not initialize the tilda recid: "${recid}" block`;

    if (!options.initBlock) {
        console.warn(`${errorMsg} because the initBlock function is "undefined"`);
        return false;
    }

    try {
        // console.log(`Calling ${funcName}(${recid})`);
        options.initBlock?.(recid);
        return true;
    } catch (e) {
        console.warn(errorMsg, e.message, e);
        return false;
    }
};

export const generateUniqueRecId = (prefix: string = '') => {
    let id: string = undefined;

    while (!id || document.getElementById(id)) {
        id = `rec-${prefix}-${guid().substr(0, 6)}`.replace(/--/g, '-');
    }

    return id;
};
