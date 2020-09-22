const base = 'mt-stencil-components';

export const EVENTS = {
    SERVICES_LOADED: `${base}/services-loaded`,
    SERVICE_LOADED: (name: string) => `${base}/services-loaded/${name}`
};
