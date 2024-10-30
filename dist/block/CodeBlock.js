import { changeEleEmptyAttr, divIsEmpty, getEleEmptyAttr, setEleEmptyAttr, updateContent } from "../utils";
export class CodeBlock {
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.content;
        // 添加可编辑属性
        htmlDivElement.setAttribute('contenteditable', 'true'); // 设置 title 属性
        htmlDivElement.classList.add('code-block-content', 'editable');
        this.addBlockEvent(block, htmlDivElement, blockRender);
        return htmlDivElement;
    }
    addBlockEvent(block, CodeDivEle, blockRender) {
        // 监听 input 事件
        CodeDivEle.addEventListener('input', (event) => {
            changeEleEmptyAttr(CodeDivEle);
            updateContent(CodeDivEle.innerHTML, block);
        });
        // 监听删除键
        CodeDivEle.addEventListener('keyup', (event) => {
            if ((event.key === 'Backspace' || event.key === 'Delete')) {
                let attribute = getEleEmptyAttr(CodeDivEle);
                if (attribute) {
                    blockRender.delBlock(blockRender.blockList, block.blockId);
                    return;
                }
                if (divIsEmpty(CodeDivEle)) {
                    setEleEmptyAttr(CodeDivEle);
                    return;
                }
                if (attribute && !divIsEmpty(CodeDivEle)) {
                    setEleEmptyAttr(CodeDivEle);
                    return;
                }
            }
        });
    }
}
