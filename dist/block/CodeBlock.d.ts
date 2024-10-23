import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class CodeBlock implements BlockView {
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    addBlockEvent(block: Block, CodeDivEle: HTMLDivElement, blockRender: BlockRender): void;
}
