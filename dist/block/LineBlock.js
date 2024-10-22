import { BlockType } from "../types";
import { updateContent } from "../utils";
export class LineBlock {
    writeBytesToFile;
    constructor(writeBytesToFile) {
        this.writeBytesToFile = writeBytesToFile;
    }
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.content;
        // 添加可编辑属性
        htmlDivElement.setAttribute('contenteditable', 'true'); // 设置 title 属性
        htmlDivElement.classList.add('editable', 'placeholder-div');
        this.addLineBlockEvent(htmlDivElement, block, blockRender);
        return htmlDivElement;
    }
    addLineBlockEvent(LineDivEle, block, blockRender) {
        // 监听 input 事件
        LineDivEle.addEventListener('input', (event) => {
            if (LineDivEle.innerHTML === '/' || LineDivEle.innerHTML === '') {
                block.blockData.content = LineDivEle.innerHTML;
                if (blockRender.menu) {
                    blockRender.menu.hidden = LineDivEle.innerHTML !== '/';
                    // 如果要显示菜单，则自动获取焦点 同时调整位置
                    if (blockRender.menu.hidden) {
                        blockRender.menu.focus();
                        if (blockRender.positionY == undefined)
                            blockRender.positionY = 0;
                        if (blockRender.positionX == undefined)
                            blockRender.positionX = 0;
                        blockRender.menu.style.top = blockRender.positionY + 'px';
                        blockRender.menu.style.left = blockRender.positionX - 40 + 'px';
                    }
                }
                return;
            }
            updateContent(LineDivEle.innerHTML, block);
        });
        // 阻止默认事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            LineDivEle.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
        // 高亮拖放区域
        ['dragenter', 'dragover'].forEach(eventName => {
            LineDivEle.addEventListener(eventName, () => {
                LineDivEle.classList.add('hover');
            }, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            LineDivEle.addEventListener(eventName, () => {
                LineDivEle.classList.remove('hover');
            }, false);
        });
        // 处理文件
        LineDivEle.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (dt == undefined)
                return;
            const files = dt.files;
            handleFiles(files);
        }, false);
        const handleFiles = (files) => {
            if (files == undefined)
                return;
            for (let i = 0; i < files.length; i++) {
                uploadFile(files.item(i));
            }
        };
        const uploadFile = (file) => {
            console.log('uploadFile');
            if (file == null)
                return;
            const reader = new FileReader();
            // 将文件读取为 ArrayBuffer
            reader.readAsArrayBuffer(file);
            // 处理读取完成后的结果
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result;
                block.blockType = BlockType.FILE;
                block.blockData.file = {
                    fileName: {
                        content: file.name,
                        fontSize: '',
                        color: ''
                    },
                    fileUrl: '',
                    filePath: '',
                    fileImage: ''
                };
                blockRender.changeBlock(blockRender.blockList, blockRender.currentBlockId, block);
                if (arrayBuffer) {
                    // 将 ArrayBuffer 转换为 Uint8Array (字节数组)
                    const byteArray = new Uint8Array(arrayBuffer);
                    const numberArray = Array.from(byteArray);
                    this.writeBytesToFile(numberArray, file.name);
                }
            };
        };
    }
}
