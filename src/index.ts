import {Block, BlockData, BlockOption, BlockType, LanguageType} from "./types";
import './index.css';
import { getRandomInt, setEleEmptyAttr} from "./utils";  // 自动导入样式
export { LineBlock } from './block/LineBlock';
export { ListBlock } from './block/ListBlock';
export { CodeBlock } from './block/CodeBlock';
export { PageBlock } from './block/PageBlock';
export { FileBlock } from './block/FileBlock';

export * from './types';   // 导出类型

export interface BlockView{
    renderView(block:Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender):void
    addBlockEvent(block:Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender):void
}

export class BlockRender{
    eleId:string
    userId:string
    blockList:Array<Block>
    blockOption:Array<BlockOption>
    currentBlockId: string
    positionX?:number
    positionY?:number
    menu?:HTMLDivElement
    isDragging?:boolean // 是否拖动
    selectEdBlockElement?:Array<HTMLDivElement>
    maxSort?:number

    constructor(eleId:string,userId:string,currentBlockId: string,blockList:Array<Block>,blockOption:Array<BlockOption>) {
        this.eleId = eleId
        this.userId = userId
        this.blockOption = blockOption
        this.currentBlockId = currentBlockId
        this.blockList = blockList
        this.init()
    }

    public render(blockList:Array<Block>){
        this.blockList = blockList
        this.init()
    }

    public blockEleRender(block:Block):HTMLDivElement {
        // 根据块类型获取块的渲染器
        let blockOption = this.getBlockOption(block);
        if (blockOption === undefined) return document.createElement('div')
        let blockView = blockOption.blockView;

        // 新建块的根元素
        const htmlDivElement = document.createElement('div');
        htmlDivElement.classList.add('block-main')
        htmlDivElement.id='#block_'+block.blockId

        // 在根元素上使用渲染器渲染块
        blockView.renderView(block,htmlDivElement,this);

        this.addBlockEvent(block,htmlDivElement)
        // 初始化块元素是否为空
        setEleEmptyAttr(htmlDivElement)

        return htmlDivElement
    }

    public init() {
        const noteEle:HTMLDivElement | null= document.querySelector(this.eleId);
        if ( noteEle === null) return
        this.initEle(noteEle)
        this.initMenu(noteEle)
        // 添加笔记页面事件
        this.addNoteEvent(noteEle)
    }


    private initEle(noteEle:HTMLDivElement){


        // 先清理元素，这种清理方法不会触发元素上绑定的事件
        noteEle.innerHTML = ''
        // 根据数据初始化块列表
        for (let block of this.blockList) {
            noteEle.appendChild(this.blockEleRender(block))
        }

    }

    private initMenu(noteEle:HTMLDivElement ) {
        const menu = document.createElement('div');
        menu.classList.add('menu');
        // 使 div 能够获得焦点
        menu.setAttribute('tabindex', '0');
        menu.hidden = true
        menu.addEventListener('blur',()=>{
            // 点击菜单外的其他地方，隐藏菜单
            menu.hidden=true
        })

        for (let blockType of this.getBlockTypeList()) {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = blockType
            menuItem.addEventListener('click', (event: Event) => {
                this.clickMenu(blockType)
            })
            menu.appendChild(menuItem)
        }

        this.menu = menu
        noteEle.appendChild(menu)

    }


    //  点击新建块菜单，根据选择的内容新建块
    private clickMenu (blockType:BlockType){
        const block = this.createBlock();
        block.blockType = blockType;
        this.changeBlock(this.blockList,this.currentBlockId,block)
    }

    private addBlockEvent(block:Block,htmlDivElement:HTMLDivElement){
        // 鼠标拖动选择
        htmlDivElement.addEventListener('mousemove', (event) => {
            if (!this.isDragging) return
            htmlDivElement.style.backgroundColor = '#F8E6E6';
            if (this.selectEdBlockElement == undefined) this.selectEdBlockElement = []
            this.selectEdBlockElement.push(htmlDivElement)
        });

        // 添加一些块上的默认事件
        if (block.blockType !== BlockType.LIST) {
            htmlDivElement.addEventListener('focus',(event)=>{
                this.currentBlockId = block.blockId
            })
            htmlDivElement.addEventListener('keydown',(event)=>{
                if (event.key === 'Enter' && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
                    event.preventDefault(); // 阻止默认的换行行为
                    const block = this.createBlock();
                    this.insertBlock(this.blockList,this.currentBlockId,block)
                    return
                }
            })

        }
    }
    private addNoteEvent(NoteEle:HTMLDivElement){

        NoteEle.addEventListener('mouseup',(e)=>{
            // 记录鼠标当前位置
            this.positionX = e.pageX
            this.positionY = e.pageY

            if (this.isDragging){
                // 如果是拖动后抬起，需要弹出操作菜单
            }
            // 鼠标抬起关闭拖动标记
            this.isDragging = false;
        })
        // 鼠标按下拖动标记打开
        NoteEle.addEventListener('mousedown',(e)=>{
            this.isDragging = true;
            // 同时清理上一次的选择
            if ( this.selectEdBlockElement == undefined ) return
            for (let htmlDivElement of this.selectEdBlockElement) {
                htmlDivElement.style.backgroundColor = '';
            }
            this.selectEdBlockElement = []
        })

        NoteEle.addEventListener('keyup',(e)=>{
            if ((e.key === 'Backspace' || e.key === 'Delete') ) {
                if (this.selectEdBlockElement == undefined) return
                for (let htmlDivElement of this.selectEdBlockElement) {
                    htmlDivElement.remove()
                }
            }
        })

    }


    private getBlockTypeList(){
        return  this.blockOption.map(e=>e.blockName)
    }

    private getBlockOption(block:Block):BlockOption | undefined{
        return this.blockOption.find(e=>e.blockName === block.blockType);
    }

    private getBlockEle(blockId:string):HTMLDivElement {
        let ele = document.getElementById('#block_'+blockId) as HTMLDivElement | null;
        if (ele === null) throw new Error('block ele is null')
        return ele
    }

    public createBlock(): Block{
        if (this.maxSort == undefined) this.maxSort = 0
        this.maxSort+=1
        return {
            parentBlockId: "",
            sort: this.maxSort, // 展示顺序
            blockId: this.userId + '' + new Date().getTime() + getRandomInt(0,10),
            position: '', // 块的位置开始于第几行
            blockData: {
                content: "",
            } as BlockData,// 块数据
            style: '', // 块样式
            blockType: BlockType.LINE, // 块类型，不同的类型使用不同的渲染函数渲染
            blockLanguage: LanguageType.TEXT,
            isShow:true,
            isFoldBlock:false,
            selectEd:{
                selectStr:'',
                isSelected:false,
                mousePositionX:0,
                mousePositionY:0
            },
            childBlockList:[] as Array<Block>,
            blockTitle: ''
        }
    }

    public delBlock(blockList: Array<Block>,blockId:string){
        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];

            // 找到当前块
            if (blockF.blockId === blockId) {

                // 先移除数据
                blockList.splice(i, 1);
                // 再移除元素
                this.getBlockEle(blockF.blockId).remove()

                return;
            }
            // 如果当前块有子块，递归查找
            if (blockF.childBlockList && blockF.childBlockList.length > 0) {
                this.delBlock(blockF.childBlockList,blockId);
            }
        }

    }


    /**
     * 在当前块下方插入新块，并且修改数据
     * @param blockList
     * @param currentBlockId
     * @param newBlock
     * @private
     */
    public insertBlock (blockList: Array<Block>, currentBlockId: string, newBlock: Block) {
        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];

            // 找到当前块
            if (blockF.blockId === currentBlockId) {
                // 在当前块后插入新块; 数据修改后要修改页面
                blockList.splice(i + 1, 0, newBlock);
                // 渲染新的块元素
                const newBlockEle = this.blockEleRender(newBlock);


                // 确保当前块元素存在，插入新块元素到当前块元素之后
                let currentBlockEle = this.getBlockEle(currentBlockId)
                if (currentBlockEle) {
                    currentBlockEle.insertAdjacentElement('afterend', newBlockEle);
                }
                newBlockEle.focus()
                return;
            }

            // 如果当前块有子块，递归查找
            if (blockF.childBlockList && blockF.childBlockList.length > 0) {
                this.insertBlock(blockF.childBlockList, currentBlockId, newBlock);
            }
        }
    }

    /**
     * 修改块数据，并重新渲染
     * @private
     */
    public changeBlock(blockList: Array<Block>, currentBlockId: string, newBlock: Block){

        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];

            // 找到当前块
            if (blockF.blockId === currentBlockId) {
                // 确保当前块元素存在，当前块替换为新的块
                let currentBlockEle = this.getBlockEle(currentBlockId)
                if (currentBlockEle) {
                    // 列表块，默认新增一个空白子块
                    if (newBlock.blockType === BlockType.LIST){
                        const block = this.createBlock();
                        newBlock.childBlockList.push(block);
                    }
                    // 在当前块替换为新块
                    blockList.splice(i, 1, newBlock);
                    // 渲染新的块元素
                    const newBlockEle = this.blockEleRender(newBlock);
                    // 当前块替换为新的块
                    // 替换到当前位置
                    currentBlockEle.replaceWith(newBlockEle);

                }
                return;
            }
            // 如果当前块有子块，递归查找
            if (blockF.childBlockList && blockF.childBlockList.length > 0) {
                this.changeBlock(blockF.childBlockList, currentBlockId, newBlock);
            }
        }
    }

}
