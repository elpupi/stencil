import { VNode } from '@stencil/core';
export const Fragment = <T,>(_props: T, children: VNode[]) => [ ...children ];
