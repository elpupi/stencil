export type OnListenerOptions = { element: HTMLElement; componentElts: HTMLElement[]; };

export type OnZeroBlockMouseHoverOptions = {
    componentCssName?: string;
    componentElements?: HTMLElement[];
    elementHoverCssName?: string;
    componentHoverCssName?: string;
    onEnter?: (options: OnListenerOptions) => void;
    onLeave?: (options: OnListenerOptions) => void;
    onComponentEnter?: (options: OnListenerOptions) => void;
    onComponentLeave?: (options: OnListenerOptions) => void;
};



const getParent = (from: HTMLElement, accept: (el: HTMLElement) => boolean): HTMLElement | null => {
    return !from || accept(from) ? from : getParent(from.parentElement, accept);
};

export const getTildaBlock = (from: HTMLElement) => getParent(from, el => !!el?.id);
export const getZeroBlockElement = (from: HTMLElement) => getParent(from, el => el?.classList.contains('tn-elem'));

export const onZeroBlockMouseHover = (elements: HTMLElement[], options: OnZeroBlockMouseHoverOptions = {}) => {
    const {
        componentCssName: cmpCssName,
        componentElements, // elements forming the component
        elementHoverCssName = 'mt-element-hover',
        componentHoverCssName = 'mt-component-hover',
        onEnter,
        onLeave,
        onComponentEnter,
        onComponentLeave
    } = options;

    // elements to listen to
    const elts = Array.isArray(elements) ? elements : [ elements ];
    const componentCssName = cmpCssName || [ ...elts[ 0 ].classList ].find(name => name.startsWith('mt-'));

    let state: 'cmp-hovered' | 'cmp-not-hovered' = 'cmp-not-hovered';

    const addListener = (element: HTMLElement) => {
        const tildaBlock = getTildaBlock(element);
        const componentElts = componentElements || [ ...tildaBlock.querySelectorAll<HTMLElement>(`.${componentCssName}`) ];

        // mouse enters element
        element.addEventListener('mouseenter', () => {
            element.classList.add(elementHoverCssName);

            if (state === 'cmp-not-hovered') {
                componentElts.forEach(el => el.classList.add(componentHoverCssName));
                onComponentEnter?.({ element, componentElts });
                state = 'cmp-hovered';
            }

            onEnter?.({ element, componentElts });
        });

        // We can have stacked elements, or nested ones, or intersecting ones
        // So while we are hovering one element, we can enter and leave other ones
        // We could keep a counter but it is easier to keep in the closure the entered "element".
        // We can then listen to the other component elements 
        const addMouseLeave = (elt: HTMLElement) => elt.addEventListener('mouseleave', () => {
            // get the highest "Z" element hovered
            const hoveredElmt = [ ...document.querySelectorAll<HTMLElement>(':hover') ]?.at(-1);
            // get the tn-elem being the ZeroBlock wrapper of each element
            const hoveredZeroBlockElmt = getZeroBlockElement(hoveredElmt);
            // check if the wrapper is hovered
            const isComponentEltHovered = componentElts.some(el => el === hoveredZeroBlockElmt);

            // we continue just if "element" is hovered also
            if (element.classList.contains(elementHoverCssName)) {
                // the element hovered is not a component elt
                if (!isComponentEltHovered)
                    componentElts.forEach(el => el.classList.remove(componentHoverCssName));

                const eltsMinusElement = elts.filter(el => el !== element);
                const otherEltIsHovered = eltsMinusElement.some(el => el === hoveredZeroBlockElmt);

                // the element hovered is not a component elt OR another elt than "element" is hovered
                if (!isComponentEltHovered || otherEltIsHovered) {
                    element.classList.remove(elementHoverCssName);
                    onLeave?.({ element, componentElts });
                }

                // the element hovered is not a component elt
                if (!isComponentEltHovered && state === 'cmp-hovered') {
                    onComponentLeave?.({ element, componentElts });
                    state = 'cmp-not-hovered';
                }

            }
        });


        componentElts.forEach(addMouseLeave);
    };

    elts.forEach(addListener);
};
