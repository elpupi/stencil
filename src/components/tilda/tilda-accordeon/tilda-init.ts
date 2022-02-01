export const t668_init = (recid: string) => {
    const el = $('#rec' + recid);
    const toggler = el.find(".t668__header");

    const accordeon = (el.find('.t668__accordion')?.attr('data-accordion') ?? 'false') as 'true' | 'false';

    toggler.on('click', function (this) {
        if (accordeon === 'true') {
            toggler.not(this).removeClass("t668__opened").next().slideUp();
        }

        $(this).toggleClass("t668__opened");
        $(this).next().slideToggle();

        if ((window as any).lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad?.('t_lazyload_update', () => t_lazyload_update?.());
        }
    });
};


declare let t_onFuncLoad: (funcName: string, okFunc: () => void, time?: number) => void;
declare let t_lazyload_update: () => void;
