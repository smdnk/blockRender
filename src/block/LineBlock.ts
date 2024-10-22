import {BlockRender, BlockView} from "../index";
import {Block, BlockOption, BlockType} from "../types";
import {updateContent} from "../utils";
import {writeBytesToFile} from "@/utils/fileUtils";

export class LineBlock extends BlockView {

  renderView(block: Block,htmlDivElement:HTMLDivElement,blockRender:BlockRender) {
    this.blockRender = blockRender

    htmlDivElement.innerHTML = block.blockData.content
    // 添加可编辑属性
    htmlDivElement.setAttribute('contenteditable', 'true');  // 设置 title 属性
    htmlDivElement.classList.add('editable','placeholder-div')

    this.addLineBlockEvent(htmlDivElement,block)

    return htmlDivElement;
  }

  private addLineBlockEvent(LineDivEle:HTMLDivElement,block:Block) {
    // 监听 input 事件
    LineDivEle.addEventListener('input', (event: Event) => {
      if (LineDivEle.innerHTML === '/' || LineDivEle.innerHTML === '') {
        debugger
        block.blockData.content = LineDivEle.innerHTML
        if (this.blockRender.menu) {
          this.blockRender.menu.hidden = LineDivEle.innerHTML !== '/'
          // 如果要显示菜单，则自动获取焦点 同时调整位置
          if ( !this.blockRender.menu.hidden)  {
            this.blockRender.menu.focus()
            this.blockRender.menu.style.top = this.blockRender.positionY + 'px'
            this.blockRender.menu.style.left = this.blockRender.positionX - 40 + 'px'
          }
        }
        return
      }

      updateContent(LineDivEle.innerHTML, block)
    });

    // 阻止默认事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      LineDivEle.addEventListener(eventName, (e)=>{
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // 高亮拖放区域
    ['dragenter', 'dragover'].forEach(eventName => {
      LineDivEle.addEventListener(eventName, ()=>{
        LineDivEle.classList.add('hover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      LineDivEle.addEventListener(eventName, ()=>{
        LineDivEle.classList.remove('hover');
      }, false);
    });

    // 处理文件
    LineDivEle.addEventListener('drop', (e)=>{
      const dt = e.dataTransfer;
      if (dt == undefined) return
      const files = dt.files;
      handleFiles(files);
    }, false);


    const handleFiles = (files: FileList) => {
      if (files == undefined) return
      for (let i = 0; i < files.length; i++) {
        uploadFile(files.item(i))
      }

    }

    const uploadFile = (file: File | null) => {
      console.log('uploadFile')
      if (file == null) return

      const reader: FileReader = new FileReader();
      // 将文件读取为 ArrayBuffer
      reader.readAsArrayBuffer(file);

      // 处理读取完成后的结果
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const arrayBuffer: ArrayBuffer | null = event.target?.result as ArrayBuffer;

        block.blockType = BlockType.FILE
        block.blockData.file = {
          fileName: {
            content: file.name,
            fontSize: '',
            color: ''
          },
          fileUrl: '',
          filePath: '',
          fileImage: ''
        }
        this.blockRender.changeBlock(this.blockRender.blockList,this.blockRender.currentBlockId,block)

        if (arrayBuffer) {
          // 将 ArrayBuffer 转换为 Uint8Array (字节数组)
          const byteArray: Uint8Array = new Uint8Array(arrayBuffer);
          const numberArray = Array.from(byteArray);


          await writeBytesToFile(numberArray, file.name)

        }
      };

    }
  }
}
