import { Block, BlockOption } from "./types";
import './index.css';
export { LineBlock } from './block/LineBlock';
export { ListBlock } from './block/ListBlock';
export { CodeBlock } from './block/CodeBlock';
export { PageBlock } from './block/PageBlock';
export { FileBlock } from './block/FileBlock';
export * from './types';
export interface BlockView {
    renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender): void;
}
export declare class BlockRender {
    eleId: string;
    userId: string;
    blockList: Array<Block>;
    blockOption: Array<BlockOption>;
    currentBlockId: string;
    positionX?: number;
    positionY?: number;
    menu?: HTMLDivElement;
    maxSort?: number;
    constructor(eleId: string, userId: string, currentBlockId: string, blockOption: Array<BlockOption>);
    render(blockList: Array<Block>): void;
    blockEleRender(block: Block): HTMLDivElement;
    init(): void;
    private initEle;
    private initMenu;
    private clickMenu;
    private addNoteEvent;
    private getBlockTypeList;
    private getBlockOption;
    private getBlockEle;
    createBlock(): Block;
    /**
     * 在当前块下方插入新块，并且修改数据
     * @param blockList
     * @param currentBlockId
     * @param newBlock
     * @private
     */
    insertBlock(blockList: Array<Block>, currentBlockId: string, newBlock: Block): void;
    /**
     * 修改块数据，并重新渲染
     * @private
     */
    changeBlock(blockList: Array<Block>, currentBlockId: string, newBlock: Block): void;
}
