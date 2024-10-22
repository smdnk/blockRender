import {BlockRender, BlockView} from "../index";
import {Block} from "../types";

export class FileBlock extends BlockView{

  openFileManager:Function

  constructor(openFileManager:Function) {
    super();
    this.openFileManager = openFileManager
  }
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {
    this.blockRender = blockRender

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
