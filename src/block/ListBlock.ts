import {BlockRender, BlockView} from "../index";
import {Block} from "../types";

export class ListBlock implements BlockView{


  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender){

    // 先添加一个折叠列表标题
    let childBlockEle = document.createElement('div')
    htmlDivElement.appendChild(this.createListTitleEle(block,childBlockEle))

    childBlockEle.classList.add('list-block-content')

    for (let blockChild of block.childBlockList) {
      childBlockEle.appendChild(blockRender.blockEleRender(blockChild))
    }
    htmlDivElement.appendChild(childBlockEle)

    return htmlDivElement;
  }

  addBlockEvent(block: Block,LineDivEle:HTMLDivElement,blockRender:BlockRender){

  }

  private createListTitleEle(block:Block,childBlockEle:HTMLDivElement):HTMLDivElement{
    const titleDivEle = document.createElement('div');
    titleDivEle.classList.add('list-title')
    const titleIconEle = document.createElement('span');
    titleIconEle.classList.add('mdi-triangle-small-down');
    titleIconEle.classList.add('mdi');
    titleIconEle.style.fontSize='16px'
    titleIconEle.addEventListener('click',()=>{
      childBlockEle.hidden = !childBlockEle.hidden
    })
    const titleInputEle = document.createElement('input');
    titleInputEle.value = block.blockData.content
    titleDivEle.appendChild(titleIconEle);
    titleDivEle.appendChild(titleInputEle);
    return titleDivEle
  }
}
