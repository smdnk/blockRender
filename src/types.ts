import {BlockView} from "./index";

export type CustomerText = {
    color:string
    fontSize:string
    content:string  // 内容
}

export enum BlockType {
    LINE = 'line',
    CODE = 'code',
    PAGE = 'page',
    FILE = 'file',
    IMAGE = 'image',
    LIST = 'list',
}
export type SelectEd = {
    isSelected:boolean,
    selectStr:string,
    mousePositionX:number,
    mousePositionY:number,
}

export type PageTitle = {
    color:string
    fontSize:string
    content:string  // 内容
}
export enum LanguageType {
    TEXT = 'Text',
    JAVA= 'Java'
}
export type CustomerFile={
    fileName:CustomerText
    filePath:string
    fileUrl:string
    fileImage:string
}

export type BlockData={
    content:string
    pageId:string
    file:CustomerFile
}

export type Block = {
    sort:number // 展示顺序
    blockId:string
    position?:string // 块的位置开始于第几行
    blockData:BlockData // 块数据
    style?:string // 块样式
    blockType:BlockType // 块类型，不同的类型使用不同的渲染函数渲染
    blockLanguage?:LanguageType // 块语言
    isShow:boolean // 折叠列表功能
    isFoldBlock:boolean // 是否是折叠列表
    childBlockList:Array<Block> // 嵌套块。折叠列表中出现
    parentBlockId:string // 所属的父级块
    selectEd:SelectEd // 选择文本
    blockTitle:string //
}
export type BlockOption = {
    blockName:BlockType,
    blockView:BlockView,
    shortcut?:string,
}