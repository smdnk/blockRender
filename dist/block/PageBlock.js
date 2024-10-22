export class PageBlock {
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.content;
        return htmlDivElement;
    }
}
