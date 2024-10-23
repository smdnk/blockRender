import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class FileBlock implements BlockView {
    openFileManager: (block: Block) => void;
    constructor(openFileManager: (block: Block) => void);
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    addBlockEvent(block: Block, FileDivEle: HTMLDivElement, blockRender: BlockRender): void;
}
