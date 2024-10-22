export class ListBlock {
    renderView(block, htmlDivElement, blockRender) {
        // 先添加一个折叠列表标题
        let childBlockEle = document.createElement('div');
        htmlDivElement.appendChild(this.createListTitleEle(block, childBlockEle));
        childBlockEle.classList.add('list-block-content');
        for (let blockChild of block.childBlockList) {
            let blockOp = blockRender.blockOption.find(e => e.blockName === blockChild.blockType);
            if (blockOp === undefined)
                continue;
            const htmlDivElement = document.createElement('div');
            htmlDivElement.classList.add('block-main');
            htmlDivElement.id = '#block_' + block.blockId;
            blockOp.blockView.renderView(blockChild, htmlDivElement, blockRender);
            childBlockEle.appendChild(htmlDivElement);
        }
        htmlDivElement.appendChild(childBlockEle);
        return htmlDivElement;
    }
    createListTitleEle(block, childBlockEle) {
        const titleDivEle = document.createElement('div');
        titleDivEle.classList.add('list-title');
        const titleIconEle = document.createElement('span');
        titleIconEle.classList.add('mdi-triangle-small-down');
        titleIconEle.classList.add('mdi');
        titleIconEle.style.fontSize = '16px';
        titleIconEle.addEventListener('click', () => {
            childBlockEle.hidden = !childBlockEle.hidden;
        });
        const titleInputEle = document.createElement('input');
        titleInputEle.value = block.blockData.content;
        titleDivEle.appendChild(titleIconEle);
        titleDivEle.appendChild(titleInputEle);
        return titleDivEle;
    }
}
