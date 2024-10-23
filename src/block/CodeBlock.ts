import {BlockRender, BlockView} from "../index";
import {Block} from "../types";
import {updateContent} from "../utils";

export class CodeBlock implements BlockView {
  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {

    htmlDivElement.innerHTML = block.blockData.content
    // 添加可编辑属性
    htmlDivElement.setAttribute('contenteditable', 'true');  // 设置 title 属性
    htmlDivElement.classList.add('code-block-content','editable')
    this.addBlockEvent(block,htmlDivElement,blockRender)
    return htmlDivElement;
  }

  addBlockEvent(block: Block,CodeDivEle:HTMLDivElement,blockRender:BlockRender){

    // 监听 input 事件
    CodeDivEle.addEventListener('input', (event: Event) => {
      updateContent(CodeDivEle.innerHTML,block)
    });

    // 监听删除键
    CodeDivEle.addEventListener('keyup',(event)=>{

      if ((event.key === 'Backspace' || event.key === 'Delete') ) {

        let attribute = CodeDivEle.getAttribute('empty');
        if (attribute === 'true'){
          blockRender.delBlock(blockRender.blockList,block.blockId)
          return
        }

        if (CodeDivEle.innerText == ''){
          CodeDivEle.setAttribute('empty','true')
          return;
        }

        if (attribute === 'true' && CodeDivEle.innerText != ''){
          CodeDivEle.setAttribute('empty','false')
          return;
        }

      }
    });
  }

}
