import { VNodeData, VNode, JSX as LocalJSX, JSXBase } from '@stencil/core/internal';
export * from './components'; // Do not know why but dist/custom-elements/index.d.ts is referencing this file and not ./components.d.ts

/* declare global {
    export namespace h {
        function h(sel: any): VNode;
        function h(sel: Node, data: VNodeData): VNode;
        function h(sel: any, data: VNodeData): VNode;
        function h(sel: any, text: string): VNode;
        function h(sel: any, children: Array<VNode | undefined | null>): VNode;
        function h(sel: any, data: VNodeData, text: string): VNode;
        function h(sel: any, data: VNodeData, children: Array<VNode | undefined | null>): VNode;
        function h(sel: any, data: VNodeData, children: VNode): VNode;
        namespace JSX {
            interface IntrinsicElements extends LocalJSX.IntrinsicElements, Omit<JSXBase.IntrinsicElements, 'svg' | 'div'> {
                [ tagName: string ]: any;
                svg: JSXBase.SVGAttributes<SVGElement> & { viewbox?: string; xmlnsXlink?: string; };
                div: JSXBase.HTMLAttributes<HTMLDivElement> & { field?: string; };
            }
        }
    }
} */

// export { h } from '@stencil/core/internal';

declare module '@stencil/core' {
    export namespace h {
        function h(sel: any): VNode;
        function h(sel: Node, data: VNodeData): VNode;
        function h(sel: any, data: VNodeData): VNode;
        function h(sel: any, text: string): VNode;
        function h(sel: any, children: Array<VNode | undefined | null>): VNode;
        function h(sel: any, data: VNodeData, text: string): VNode;
        function h(sel: any, data: VNodeData, children: Array<VNode | undefined | null>): VNode;
        function h(sel: any, data: VNodeData, children: VNode): VNode;
        namespace JSX {
            interface IntrinsicElements extends LocalJSX.IntrinsicElements, Omit<JSXBase.IntrinsicElements, 'svg' | 'div'> {
                svg: JSXBase.SVGAttributes<SVGElement> & { viewbox?: string; xmlnsXlink?: string; };
                div: JSXBase.HTMLAttributes<HTMLDivElement> & { field?: string; };
            }
        }
    }
}

// declare module '@stencil/core' {
/*   export namespace JSX {
      interface IntrinsicElements {
          svg: JSXBase.SVGAttributes<SVGElement> & { viewbox?: string; xmlnsXlink?: string; };
          div: JSXBase.HTMLAttributes<HTMLDivElement> & { field?: string; };
      }
  } */
// }
