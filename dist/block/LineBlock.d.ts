import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class LineBlock implements BlockView {
    writeBytesToFile: (arrData: number[], fileName: string) => void;
    constructor(writeBytesToFile: (arrData: number[], fileName: string) => void);
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    private addLineBlockEvent;
}
