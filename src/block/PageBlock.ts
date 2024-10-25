import {BlockRender, BlockView} from "../index";
import {Block} from "../types";

export class PageBlock implements BlockView {

  clickPage:(block: Block) =>void

  constructor(clickPage:(block: Block) =>void) {
    this.clickPage = clickPage;
  }

  renderView(block: Block, htmlDivElement: HTMLDivElement, blockRender: BlockRender) {


    htmlDivElement.innerHTML =
        `
        <div class="page-block-content my-click">
          <span class="mdi mdi-book-minus-outline"></span>
          <div class="content">${block.blockData.content}</div>
        </div>
      `

    this.addBlockEvent(block,htmlDivElement,blockRender)

    return htmlDivElement;
  }

  addBlockEvent(block: Block, element: HTMLDivElement, blockRender: BlockRender) {
    element.addEventListener('click', (event: Event) => {

      this.clickPage(block)
    })
  }
}
