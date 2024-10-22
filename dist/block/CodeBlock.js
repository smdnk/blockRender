import { updateContent } from "../utils";
export class CodeBlock {
    renderView(block, htmlDivElement, blockRender) {
        htmlDivElement.innerHTML = block.blockData.content;
        // 添加可编辑属性
        htmlDivElement.setAttribute('contenteditable', 'true'); // 设置 title 属性
        htmlDivElement.classList.add('code-block-content', 'editable');
        this.addCodeBlockEvent(htmlDivElement, block);
        return htmlDivElement;
    }
    addCodeBlockEvent(CodeDivEle, block) {
        // 监听 input 事件
        CodeDivEle.addEventListener('input', (event) => {
            updateContent(CodeDivEle.innerHTML, block);
        });
    }
}
