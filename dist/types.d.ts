import { BlockView } from "./index";
export type CustomerText = {
    color: string;
    fontSize: string;
    content: string;
};
export declare enum BlockType {
    LINE = "line",
    CODE = "code",
    PAGE = "page",
    FILE = "file",
    IMAGE = "image",
    LIST = "list"
}
export type SelectEd = {
    isSelected: boolean;
    selectStr: string;
    mousePositionX: number;
    mousePositionY: number;
};
export type PageTitle = {
    color: string;
    fontSize: string;
    content: string;
};
export declare enum LanguageType {
    TEXT = "Text",
    JAVA = "Java"
}
export type CustomerFile = {
    fileName: CustomerText;
    filePath: string;
    fileUrl: string;
    fileImage: string;
};
export type BlockData = {
    content: string;
    pageId: string;
    file: CustomerFile;
};
export type Block = {
    sort: number;
    blockId: string;
    position?: string;
    blockData: BlockData;
    style?: string;
    blockType: BlockType;
    blockLanguage?: LanguageType;
    isShow: boolean;
    isFoldBlock: boolean;
    childBlockList: Array<Block>;
    parentBlockId: string;
    selectEd: SelectEd;
    blockTitle: string;
};
export type BlockOption = {
    blockName: BlockType;
    blockView: BlockView;
};
