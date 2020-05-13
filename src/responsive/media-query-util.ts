import { findBpMileStoneByAlias } from './breakpoints';

export function max(alias: string, delta: number = 0) {
    return `(max-width: ${findBpMileStoneByAlias(alias).width + delta}px)`;
}

export function min(alias: string, delta: number = 0) {
    return `(min-width: ${findBpMileStoneByAlias(alias).width + delta}px)`;
}
