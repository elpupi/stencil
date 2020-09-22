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


export const initBlock = (options: Omit<InitBlock, 'element'>) => {
    const recid = (options.recid || 'rec').replace(/^rec/, '');
    const funcName = `t${options.blockid}_init`;

    try {
        // console.log(`Calling ${funcName}(${recid})`);
        window[ funcName ] && window[ funcName ](recid);
        return true;
    } catch (e) {
        console.warn(`Error while calling the tilda init method: ${funcName}("recid:" ${recid})`, e.message, e);
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
