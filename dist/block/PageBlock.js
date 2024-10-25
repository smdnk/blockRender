export class PageBlock {
    clickPage;
    constructor(clickPage) {
        this.clickPage = clickPage;
    }
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML =
            `
        <div class="page-block-content my-click">
          <span class="mdi mdi-book-minus-outline"></span>
          <div class="content">${block.blockData.content}</div>
        </div>
      `;
        this.addBlockEvent(block, htmlDivElement, blockRender);
        return htmlDivElement;
    }
    addBlockEvent(block, element, blockRender) {
        element.addEventListener('click', (event) => {
            this.clickPage(block);
        });
    }
}
