async function addComponents(components) {
    const pages = components.map(p => `/static/test/html/${p}.html`);

    for (const page of pages) {
        // first emit preload for faster fetch
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = page;
        link.as = 'fetch';
        document.head.appendChild(link);

        // fetch it
        const res = await window.fetch(page, { method: 'GET' });
        const html = await res.text();

        if (document.readyState === 'interactive' || document.readyState === 'complete')
            addHtml(html, document.body);
        else
            window.addEventListener('DOMContentLoaded', event => addHtml(html, document.body));
    }
}

function addHtml(html, container) {
    const template = document.createElement('template');
    template.innerHTML = html;

    // scripts are not executed from fetch. So we recreate them
    const scripts = [...template.content.querySelectorAll('script')];

    if (scripts.length > 0) {
        const createdScripts = buildScripts(scripts.map(s => s.textContent));

        for (const script of scripts)
            script.parentNode.removeChild(script);

        createdScripts.forEach(s => template.content.appendChild(s));
    }

    container.appendChild(template.content.cloneNode(true));
}

function buildScripts(scriptsContent) {
    return scriptsContent.map(scriptContent => {
        const script = document.createElement('script');
        script.innerHTML = scriptContent;
        return script;
    });
}
