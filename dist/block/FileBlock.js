export class FileBlock {
    openFileManager;
    constructor(openFileManager) {
        this.openFileManager = openFileManager;
    }
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.file.fileName.content;
        htmlDivElement.classList.add('file-block-content');
        this.addBlockEvent(block, htmlDivElement, blockRender);
        return htmlDivElement;
    }
    addBlockEvent(block, FileDivEle, blockRender) {
        // 监听 input 事件
        FileDivEle.addEventListener('click', () => {
            this.openFileManager(block);
        });
    }
}
