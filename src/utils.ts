import {Block} from "./types";
// 防抖函数，只有最后一次在设置时间结束后执行
export const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timer: number | null = null;

    return function (...args: any[]) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = window.setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
export const updateContent = debounce((innerHtml:string,block:Block) => {
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
    block.blockData.content = tempDiv.innerHTML
},500)

const optimizeHTML = (parent:HTMLDivElement) => {
    const children = Array.from(parent.childNodes) as Array<any>; // 把 childNodes 转换为数组

    for (let child of children) {
        // 如果是 <span> 且不包含除 <br> 外的元素，合并其内容或保留 <br>
        if (child.tagName === 'SPAN') {
            if (child.firstElementChild && child.firstElementChild.tagName === 'BR') {
                // 替换 <span> 为 <br>
                child.before(document.createElement('br'))
            } else {
                // 合并文本
                parent.replaceChild(document.createTextNode(child.textContent), child);
            }
        }
        // 递归处理子元素
        if (child.tagName === 'DIV') {
            optimizeHTML(child as HTMLDivElement);

        }
    }
}
const optimizeHTML2 = (parent:HTMLElement) => {
    const children = Array.from(parent.childNodes) as Array<any>; // 把 childNodes 转换为数组
    for (let child of children) {
        // 如果是 <span> 且不包含除 <br> 外的元素，合并其内容或保留 <br>
        if (child.tagName === 'SPAN') {
            if (child.firstElementChild && child.firstElementChild.tagName === 'BR') {
                // 替换 <span> 为 <br>
                child.remove()
            }
        }
        // 递归处理子元素
        if (child.tagName === 'DIV') {
            optimizeHTML2(child as HTMLElement);
        }
    }
}

export const divIsEmpty = (ele:HTMLDivElement):boolean=>{
    return  ele.innerHTML === '' || ele.innerHTML === '<br>' || ele.innerText === '' || ele.innerText === '\n'
}

export const getRandomInt = (min:number, max:number) =>{
    min = Math.ceil(min); // 确保最小值是整数
    max = Math.floor(max); // 确保最大值是整数
    return Math.floor(Math.random() * (max - min + 1)) + min; // 包含最大值
}

export const setEleEmptyAttr = (ele:HTMLDivElement)=>{
    ele.setAttribute('empty',divIsEmpty(ele)?'true':'false');
}
export const getEleEmptyAttr=(ele:HTMLDivElement):boolean=>{
    return  ele.getAttribute('empty') === 'true';
}

// 输入时检查，不为空时修改属性
export const changeEleEmptyAttr = (ele:HTMLDivElement)=>{
    if (getEleEmptyAttr(ele)){
        setEleEmptyAttr(ele)
    }
}