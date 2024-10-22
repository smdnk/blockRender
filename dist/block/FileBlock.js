export class FileBlock {
    openFileManager;
    constructor(openFileManager) {
        this.openFileManager = openFileManager;
    }
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.file.fileName.content;
        htmlDivElement.classList.add('file-block-content');
        this.addFileBlockEvent(htmlDivElement, block);
        return htmlDivElement;
    }
    addFileBlockEvent(FileDivEle, block) {
        // 监听 input 事件
        FileDivEle.addEventListener('click', () => {
            this.openFileManager(block);
        });
    }
}
