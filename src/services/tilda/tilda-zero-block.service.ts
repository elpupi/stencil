export type OnZeroBlockMouseHoverOptions = {
    componentCssName?: string;
    componentElements?: HTMLElement[];
    elementHoverCssName?: string;
    componentHoverCssName?: string;
    onEnter?: () => void;
    onLeave?: () => void;
};



const getParentFrom = (from: HTMLElement, accept: (el: HTMLElement) => boolean): HTMLElement | null => {
    return !from || accept(from) ? from : getParentFrom(from.parentElement, accept);
};

export const getParentTildaBlock = (from: HTMLElement) => getParentFrom(from, el => !!el?.id);
export const getParentZeroBlockElement = (from: HTMLElement) => getParentFrom(from, el => el?.classList.contains('tn-elem'));

export const onZeroBlockMouseHover = (elements: HTMLElement[], options: OnZeroBlockMouseHoverOptions = {}) => {
    const {
        componentCssName: cmpCssName,
        componentElements,
        elementHoverCssName = 'mt-element-hover',
        componentHoverCssName = 'mt-component-hover',
        onEnter,
        onLeave
    } = options;

    const elts = Array.isArray(elements) ? elements : [ elements ];
    const componentCssName = cmpCssName || [ ...elts[ 0 ].classList ].find(name => name.startsWith('mt-'));

    const addListener = (element: HTMLElement) => {
        const tildaBlock = getParentTildaBlock(element);
        const componentElts = componentElements || [ ...tildaBlock.querySelectorAll<HTMLElement>(`.${componentCssName}`) ];

        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains(elementHoverCssName)) {
                componentElts.forEach(el => el.classList.add(componentHoverCssName));
                element.classList.add(elementHoverCssName);
                onEnter?.();
            }
        });

        const addMouseLeave = (elt: HTMLElement) => {
            elt.addEventListener('mouseleave', () => {
                const hoveredElmt = [ ...document.querySelectorAll<HTMLElement>(':hover') ]?.at(-1);
                const hoveredZeroBlockElmt = getParentZeroBlockElement(hoveredElmt);
                const isHoverComponentElmt = componentElts.some(el => el === hoveredZeroBlockElmt);

                if (element.classList.contains(elementHoverCssName)) {
                    if (!isHoverComponentElmt)
                        componentElts.forEach(el => el.classList.remove(componentHoverCssName));
                    if (!isHoverComponentElmt || elts.filter(el => el !== element).some(el => el === hoveredZeroBlockElmt))
                        element.classList.remove(elementHoverCssName);
                    if (!isHoverComponentElmt)
                        onLeave?.();
                }
            });
        };

        componentElts.forEach(addMouseLeave);
    };

    elts.forEach(addListener);
};
