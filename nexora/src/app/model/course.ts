
export interface Topic {
    topicName: string; 
    content: string;
}
export interface ChapterData {
    chapterName: string; 
    topics: Topic[]; 
}
export interface ChapterList { 
    subject: string; 
    chapters: ChapterData[];
}
export interface ClassData { 
    className: string; 
    subjects: ChapterList[]; 
}