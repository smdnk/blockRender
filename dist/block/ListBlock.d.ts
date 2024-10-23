import { BlockRender, BlockView } from "../index";
import { Block } from "../types";
export declare class ListBlock implements BlockView {
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): HTMLDivElement;
    addBlockEvent(block: Block, LineDivEle: HTMLDivElement, blockRender: BlockRender): void;
    private createListTitleEle;
}
