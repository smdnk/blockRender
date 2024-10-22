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
    this.addFileBlockEvent(htmlDivElement,block)

    return htmlDivElement;
  }

  private addFileBlockEvent(FileDivEle:HTMLDivElement,block:Block){
    // 监听 input 事件
    FileDivEle.addEventListener('click', ()=>{
      this.openFileManager(block)
    });
  }

}
