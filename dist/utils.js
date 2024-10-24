export const updateContent = (innerHtml, block) => {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = innerHtml;
    optimizeHTML(tempDiv);
    optimizeHTML2(tempDiv);
    // 先将 \\n 替换为自己，然后将 \n 替换为 <br>
    // 使用正则表达式找到连续的 \n 并进行替换
    // let formattedStr = innerText.replace(/\n+/g, (match) => {
    //   // 将第一个 \n 替换为空字符，其余的 \n 替换为 <br>
    //   return match.length > 1 ? '<br>'.repeat(match.length - 1) : '<br>';
    // });
    // let formattedStr = innerText.replace(/\\n/g, "\\\\n").replace(/\n/g, "<br>");
    block.blockData.content = tempDiv.innerHTML;
};
const optimizeHTML = (parent) => {
    const children = Array.from(parent.childNodes); // 把 childNodes 转换为数组
    for (let child of children) {
        // 如果是 <span> 且不包含除 <br> 外的元素，合并其内容或保留 <br>
        if (child.tagName === 'SPAN') {
            if (child.firstElementChild && child.firstElementChild.tagName === 'BR') {
                // 替换 <span> 为 <br>
                child.before(document.createElement('br'));
            }
            else {
                // 合并文本
                parent.replaceChild(document.createTextNode(child.textContent), child);
            }
        }
        // 递归处理子元素
        if (child.tagName === 'DIV') {
            optimizeHTML(child);
        }
    }
};
const optimizeHTML2 = (parent) => {
    const children = Array.from(parent.childNodes); // 把 childNodes 转换为数组
    for (let child of children) {
        // 如果是 <span> 且不包含除 <br> 外的元素，合并其内容或保留 <br>
        if (child.tagName === 'SPAN') {
            if (child.firstElementChild && child.firstElementChild.tagName === 'BR') {
                // 替换 <span> 为 <br>
                child.remove();
            }
        }
        // 递归处理子元素
        if (child.tagName === 'DIV') {
            optimizeHTML2(child);
        }
    }
};
export const divIsEmpty = (ele) => {
    return ele.innerHTML === '' || ele.innerHTML === '<br>' || ele.innerText === '' || ele.innerText === '\n';
};
