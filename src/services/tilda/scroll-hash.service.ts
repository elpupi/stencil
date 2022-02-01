export const loadScrollHashService = () => {
    $(() => {
        const links = $('a[href^="#rec"]').toArray();

        for (const link of links) {
            $(link).off('click'); // we remove previous click handler from jquery to replace with a better solution

            link.addEventListener('click', e => {
                e.preventDefault();

                const targetHref = link.getAttribute('href');
                const target = document.querySelector(targetHref);

                if (!target) {
                    console.warn(`the link with href="${link.getAttribute('href')}" has no targets node with id="${targetHref}"`);
                    return;
                }

                const menuHeight = $(window).width() > 980 ? 80 : 60;
                const top = target.getBoundingClientRect().top - menuHeight;

                window.scrollBy({
                    top,
                    left: 0,
                    behavior: 'smooth'
                });
            });

            // because Tilda set a jQuery click event on the button that will override ours
            // So we add ours and delete the addEventListener listener. (TO ENHANCE WITH A BETTER SOLUTION)
            // now we prevent Tilda to add 'click' event if it is done afterwards
            const oldListener = link.addEventListener.bind(link);

            link.addEventListener = (...args: Parameters<Element[ 'addEventListener' ]>): ReturnType<Element[ 'addEventListener' ]> => {
                if (args[ 0 ] === 'click') {
                    // skip
                } else {
                    return oldListener(...args);
                }
            };
            // link.addEventListener = () => { };
        }
    });
};
