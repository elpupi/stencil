export type ScrollHashOptions = {
    menuHeight: () => number;
};

export const loadScrollHashService = (options: ScrollHashOptions) => {
    const { menuHeight } = options;

    const scrollTo = (hash: string, scrollOptions: /* ScrollToOptions & */ { speed?: number; offset?: number; } = {}) => {
        const target = document.querySelector(hash);

        if (!target) {
            console.warn(`no targets node with id="${hash.replace(/^#/, '')}"`);
            return;
        }

        // const menuHeight = $(window).width() > 980 ? 80 : 60;
        // const top = target.getBoundingClientRect().top - menuHeight();

        /* window.scrollBy({
            top,
            left: 0,
            behavior: 'smooth',
            ...scrollOptions
        }); */
        t270_scroll(hash, scrollOptions.offset ?? menuHeight(), scrollOptions.speed || 400);
    };



    // const setInternalPageHashLinks = () => {
    //     const links = $('a[href^="#rec"]').toArray() as HTMLAnchorElement[];

    //     for (const link of links) {
    //         $(link).off('click'); // we remove previous click handler from jquery to replace with a better solution

    //         link.addEventListener('click', e => {
    //             e.preventDefault();
    //             scrollTo(link.href);
    //         });

    //         // because Tilda set a jQuery click event on the button that will override ours
    //         // So we add ours and delete the addEventListener listener. (TO ENHANCE WITH A BETTER SOLUTION)
    //         // now we prevent Tilda to add 'click' event if it is done afterwards
    //         /* const oldListener = link.addEventListener.bind(link);

    //         link.addEventListener = (...args: Parameters<Element[ 'addEventListener' ]>): ReturnType<Element[ 'addEventListener' ]> => {
    //             if (args[ 0 ] === 'click') {
    //                 // skip
    //             } else {
    //                 return oldListener(...args);
    //             }
    //         }; */
    //         // link.addEventListener = () => { };
    //     }
    // };

    const initHashLinks = (window: { pathname: string; url: string; hash: string; }) => {

        const selectors = [
            `a[href^="#"]:not(${[
                '[href="#"]',
                '.carousel-control',
                '.t-carousel__control',
                '[href^="#price"]',
                '[href^="#popup"]',
                '[href^="#prodpopup"]',
                '[href^="#order"]',
                'a[href^="#!"]' ].join(',')})`,

            `a[href^="${window.pathname}#"]:not(${[
                'a[href*="#!/tproduct/"]',
                'a[href*="#!/tab/"]',
                '[href*="#popup"]' ].join(',')})`,

            `a[href^="${window.url}#"]:not(${[
                'a[href*="#!/tproduct/"]',
                'a[href*="#!/tab/"]',
                '[href*="#popup"]' ].join(',')})`
        ].join(',');


        $(selectors).on('click', function (this: HTMLAnchorElement, e) {
            e.preventDefault();
            const hash = this.hash.trim();
            scrollTo(hash);
        });


        if ($('.js-store').length > 0 || $('.js-feed').length > 0)
            scrollTo(window.hash, { speed: 1 });
    };

    const initLinksWithNameAttribute = (window: { hash: string; }) => {
        const { hash } = window;
        const hasElementWithHashName = () => hash && $('a[name="' + hash.slice(1) + '"]').length > 0;

        setTimeout(() => {
            if (hasElementWithHashName())
                scrollTo(hash);
        }, 1000);

        $(window).on('popstate', _event => {
            if (hasElementWithHashName())
                scrollTo(hash);
        });
    };

    $(() => {

        const { pathname, href: url, hash } = window.location;

        if (hash)
            scrollTo(hash/* , { behavior: 'auto' } */);

        // this is taken from the block t270 initilization <script>...</script>
        setTimeout(() => initHashLinks({ pathname, url, hash }), 500);
        initLinksWithNameAttribute({ hash });
    });
};




declare let t270_scroll: (hash: string, offset: number, speed?: number) => void;

/*
function t270_scroll(hash, offset, speed) {
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0;
    }
    var root = $('html, body');
    var target = "";
    if (speed === undefined) {
        speed = 400;
    }
    try {
        target = $(hash);
    } catch (event) {
        console.log("Exception t270: " + event.message);
        return !0;
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return !0;
        }
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var complete = function () {
        if (!isHistoryChangeAllowed) {
            return;
        }
        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
        isHistoryChangeAllowed = !1;
    };
    var dontChangeHistory = Boolean($('.t270').attr('data-history-disabled'));
    if (dontChangeHistory) {
        complete = function () { };
    }
    root.animate({
        scrollTop: target.offset().top - offset
    }, speed, complete);
    return !0;
};
 */
