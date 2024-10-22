import {BlockRender, BlockView} from "../index";
import {Block, BlockOption} from "../types";

export class PageBlock extends BlockView{
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {
    this.blockRender = blockRender


    htmlDivElement.innerHTML = block.blockData.content

    return htmlDivElement;
  }
}
