export const listToArray = <T>(domList: { forEach: (cb: (e: T) => void) => void; }) => {
    const nodeArray: T[] = [];
    domList.forEach(node => nodeArray.push(node));

    return nodeArray;
};

export const isElement = (node: Node): node is Element => node.nodeType === Node.ELEMENT_NODE;
