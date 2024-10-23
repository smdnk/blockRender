import {BlockRender, BlockView} from "../index";
import {Block} from "../types";

export class FileBlock implements BlockView{

  openFileManager:(block:Block)=>void

  constructor(openFileManager:(block:Block)=>void) {
    this.openFileManager = openFileManager
  }
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {

    htmlDivElement.innerHTML = block.blockData.file.fileName.content
    htmlDivElement.classList.add('file-block-content')
    this.addBlockEvent(block,htmlDivElement,blockRender)

    return htmlDivElement;
  }

  addBlockEvent(block: Block,FileDivEle:HTMLDivElement,blockRender:BlockRender){
    // 监听 input 事件
    FileDivEle.addEventListener('click', ()=>{
      this.openFileManager(block)
    });
  }


}
