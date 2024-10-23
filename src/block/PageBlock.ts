import {BlockRender, BlockView} from "../index";
import {Block, BlockOption} from "../types";

export class PageBlock implements BlockView{
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {


    htmlDivElement.innerHTML = block.blockData.content

    return htmlDivElement;
  }

  addBlockEvent(block: Block,LineDivEle:HTMLDivElement,blockRender:BlockRender){

  }
}
