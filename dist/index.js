import { BlockType, LanguageType } from "./types";
import './index.css'; // 自动导入样式
export { LineBlock } from './block/LineBlock';
export { ListBlock } from './block/ListBlock';
export { CodeBlock } from './block/CodeBlock';
export { PageBlock } from './block/PageBlock';
export { FileBlock } from './block/FileBlock';
export * from './types'; // 导出类型
export class BlockRender {
    eleId;
    userId;
    blockList;
    blockOption;
    currentBlockId;
    positionX;
    positionY;
    menu;
    selectBox;
    maxSort;
    constructor(eleId, userId, currentBlockId, blockList, blockOption) {
        this.eleId = eleId;
        this.userId = userId;
        this.blockOption = blockOption;
        this.currentBlockId = currentBlockId;
        this.blockList = blockList;
        this.init();
    }
    render(blockList) {
        this.blockList = blockList;
        this.init();
    }
    blockEleRender(block) {
        // 根据块类型获取块的渲染器
        let blockOption = this.getBlockOption(block);
        if (blockOption === undefined)
            return document.createElement('div');
        let blockView = blockOption.blockView;
        // 新建块的根元素
        const htmlDivElement = document.createElement('div');
        htmlDivElement.classList.add('block-main');
        htmlDivElement.id = '#block_' + block.blockId;
        // 在根元素上使用渲染器渲染块
        blockView.renderView(block, htmlDivElement, this);
        // 添加一些块上的默认事件
        if (block.blockType !== BlockType.LIST) {
            htmlDivElement.addEventListener('focus', (event) => {
                this.currentBlockId = block.blockId;
            });
            htmlDivElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
                    event.preventDefault(); // 阻止默认的换行行为
                    const block = this.createBlock();
                    this.insertBlock(this.blockList, this.currentBlockId, block);
                    return;
                }
            });
        }
        return htmlDivElement;
    }
    init() {
        const noteEle = document.querySelector(this.eleId);
        if (noteEle === null)
            return;
        this.initEle(noteEle);
        this.initMenu(noteEle);
        this.initSelectBox(noteEle);
        // 添加笔记页面事件
        this.addNoteEvent(noteEle);
    }
    initEle(noteEle) {
        // 先清理元素，这种清理方法不会触发元素上绑定的事件
        noteEle.innerHTML = '';
        // 根据数据初始化块列表
        for (let block of this.blockList) {
            noteEle.appendChild(this.blockEleRender(block));
        }
    }
    initMenu(noteEle) {
        const menu = document.createElement('div');
        menu.classList.add('menu');
        // 使 div 能够获得焦点
        menu.setAttribute('tabindex', '0');
        menu.hidden = true;
        menu.addEventListener('blur', () => {
            // 点击菜单外的其他地方，隐藏菜单
            menu.hidden = true;
        });
        for (let blockType of this.getBlockTypeList()) {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = blockType;
            menuItem.addEventListener('click', (event) => {
                this.clickMenu(blockType);
            });
            menu.appendChild(menuItem);
        }
        this.menu = menu;
        noteEle.appendChild(menu);
    }
    initSelectBox(noteEle) {
        this.selectBox = document.createElement('div');
        this.selectBox.classList.add('selection-box');
        noteEle.appendChild(this.selectBox);
    }
    //  点击新建块菜单，根据选择的内容新建块
    clickMenu(blockType) {
        const block = this.createBlock();
        block.blockType = blockType;
        this.changeBlock(this.blockList, this.currentBlockId, block);
    }
    addNoteEvent(NoteEle) {
        let isDragging = false;
        let startX, startY;
        NoteEle.addEventListener('mouseup', (e) => {
            // 记录鼠标当前位置
            this.positionX = e.pageX;
            this.positionY = e.pageY;
            isDragging = false;
            if (this.selectBox === undefined)
                return;
            this.selectBox.style.display = 'none'; // 隐藏矩形框
        });
        NoteEle.addEventListener("mousedown", (event) => {
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
            if (this.selectBox === undefined)
                return;
            this.selectBox.style.left = `${startX}px`;
            this.selectBox.style.top = `${startY}px`;
            this.selectBox.style.width = '0';
            this.selectBox.style.height = '0';
            this.selectBox.style.display = 'block'; // 显示矩形框
        });
        NoteEle.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const currentX = event.clientX;
                const currentY = event.clientY;
                const width = currentX - startX;
                const height = currentY - startY;
                if (this.selectBox === undefined)
                    return;
                this.selectBox.style.width = `${Math.abs(width)}px`;
                this.selectBox.style.height = `${Math.abs(height)}px`;
                this.selectBox.style.left = `${Math.min(startX, currentX)}px`;
                this.selectBox.style.top = `${Math.min(startY, currentY)}px`;
            }
        });
    }
    getBlockTypeList() {
        return this.blockOption.map(e => e.blockName);
    }
    getBlockOption(block) {
        return this.blockOption.find(e => e.blockName === block.blockType);
    }
    getBlockEle(blockId) {
        let ele = document.getElementById('#block_' + blockId);
        if (ele === null)
            throw new Error('block ele is null');
        return ele;
    }
    createBlock() {
        if (this.maxSort == undefined)
            this.maxSort = 0;
        this.maxSort += 1;
        return {
            parentBlockId: "",
            sort: this.maxSort, // 展示顺序
            blockId: this.userId + '' + new Date().getTime(),
            position: '', // 块的位置开始于第几行
            blockData: {
                content: "",
            }, // 块数据
            style: '', // 块样式
            blockType: BlockType.LINE, // 块类型，不同的类型使用不同的渲染函数渲染
            blockLanguage: LanguageType.TEXT,
            isShow: true,
            isFoldBlock: false,
            selectEd: {
                selectStr: '',
                isSelected: false,
                mousePositionX: 0,
                mousePositionY: 0
            },
            childBlockList: [],
            blockTitle: ''
        };
    }
    delBlock(blockList, blockId) {
        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];
            // 找到当前块
            if (blockF.blockId === blockId) {
                // 先移除数据
                blockList.splice(i, 1);
                // 再移除元素
                this.getBlockEle(blockF.blockId).remove();
                return;
            }
            // 如果当前块有子块，递归查找
            if (blockF.childBlockList && blockF.childBlockList.length > 0) {
                this.delBlock(blockF.childBlockList, blockId);
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
    insertBlock(blockList, currentBlockId, newBlock) {
        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];
            // 找到当前块
            if (blockF.blockId === currentBlockId) {
                // 在当前块后插入新块; 数据修改后要修改页面
                blockList.splice(i + 1, 0, newBlock);
                // 渲染新的块元素
                const newBlockEle = this.blockEleRender(newBlock);
                // 确保当前块元素存在，插入新块元素到当前块元素之后
                let currentBlockEle = this.getBlockEle(currentBlockId);
                if (currentBlockEle) {
                    currentBlockEle.insertAdjacentElement('afterend', newBlockEle);
                }
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
    changeBlock(blockList, currentBlockId, newBlock) {
        for (let i = 0; i < blockList.length; i++) {
            const blockF = blockList[i];
            // 找到当前块
            if (blockF.blockId === currentBlockId) {
                // 确保当前块元素存在，当前块替换为新的块
                let currentBlockEle = this.getBlockEle(currentBlockId);
                if (currentBlockEle) {
                    // 列表块，默认新增一个空白子块
                    if (newBlock.blockType === BlockType.LIST) {
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
