import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class FileBlock implements BlockView {
    openFileManager: (block: Block) => void;
    constructor(openFileManager: (block: Block) => void);
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    private addFileBlockEvent;
}
