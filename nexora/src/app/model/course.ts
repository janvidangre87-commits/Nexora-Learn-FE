
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

export interface Question {
  id: number;
  type: 'mcq' | 'description' | 'true-false';
  questionText: string;
  options?: string[];      
  correctAnswer?: string | boolean;
}