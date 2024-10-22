import {BlockRender, BlockView} from "../index";
import {Block} from "../types";
import {updateContent} from "../utils";

export class CodeBlock extends BlockView {
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {
    this.blockRender = blockRender

    htmlDivElement.innerHTML = block.blockData.content
    // 添加可编辑属性
    htmlDivElement.setAttribute('contenteditable', 'true');  // 设置 title 属性
    htmlDivElement.classList.add('code-block-content','editable')
    this.addCodeBlockEvent(htmlDivElement,block)
    return htmlDivElement;
  }

  private addCodeBlockEvent(CodeDivEle:HTMLDivElement,block:Block){

    // 监听 input 事件
    CodeDivEle.addEventListener('input', (event: Event) => {
      updateContent(CodeDivEle.innerHTML,block)
    });
  }

}
