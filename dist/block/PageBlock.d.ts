import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class PageBlock implements BlockView {
    clickPage: (block: Block) => void;
    constructor(clickPage: (block: Block) => void);
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    addBlockEvent(block: Block, element: HTMLDivElement, blockRender: BlockRender): void;
}
