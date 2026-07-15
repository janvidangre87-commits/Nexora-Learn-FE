import { Injectable } from '@angular/core';
import { ChapterData, ChapterList, ClassData, Topic } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private showContent: boolean = false;
  private contentData: string = '';

   private allData: ClassData[] = [
     {
      className:"9",
      subjects:[
        {
          subject:"History",
          chapters:[
            {
              chapterName:"A Letter to God",
              topics:[
                {
                  topicName:"Text form god", content:"one day i was in temple i found letter from god"
                },
              ]
            },
            {
              chapterName:"Long Walk to Freedom",
              topics:[
                {
                  topicName:"out of the home", content:"one day i was in temple i found letter from god"
                },
              ]
            }
          ]
        },
      ]
    },


    {
      className:"10",
      subjects:[
        {
          subject:"English",
          chapters:[
            {
              chapterName:"A Letter to God",
              topics:[
                {
                  topicName:"Text form god", content:"one day i was in temple i found letter from god"
                },
              ]
            },
            {
              chapterName:"Long Walk to Freedom",
              topics:[
                {
                  topicName:"out of the home", content:"one day i was in temple i found letter from god"
                },
              ]
            }
          ]
        },
      ]
    },

    {
      className: "11",
      subjects: [
        {
          subject: "Physics",
          chapters: [
            {
              chapterName: "Laws of Motion",
              topics: [
                { topicName: "Newton's First Law", content: "An object remains at rest or in uniform motion unless acted upon by an external force." },
                { topicName: "Newton's Second Law", content: "Force equals mass times acceleration (F = ma)." },
                { topicName: "Newton's Third Law", content: "For every action there is an equal and opposite reaction." }
              ]
            },
            {
              chapterName: "Gravitation",
              topics: [
                { topicName: "Universal Law of Gravitation", content: "Every object attracts every other object with a force proportional to their masses." },
                { topicName: "Kepler's Laws", content: "Planets move in elliptical orbits around the sun." }
              ]
            }
          ]
        },
        {
          subject: "Chemistry",
          chapters: [
            {
              chapterName: "Structure of Atom",
              topics: [
                { topicName: "Bohr's Model", content: "Electrons revolve around the nucleus in fixed circular orbits." },
                { topicName: "Quantum Numbers", content: "Four quantum numbers describe the position and energy of an electron." }
              ]
            }
          ]
        }
      ]
    },
    {
      className: "12",
      subjects: [
        {
          subject: "Physics",
          chapters: [
            {
              chapterName: "Electric Charges",
              topics: [
                { topicName: "Coulomb's Law", content: "Force between two charges is proportional to product of charges and inversely proportional to square of distance." },
                { topicName: "Electric Field", content: "Region around a charge where another charge experiences a force." }
              ]
            }
          ]
        }
      ]
    }
  ];


   getAllClasses(): ClassData[] {
    return this.allData;
  }


  getSubjectsByClass(className: string): ChapterList[] {
    const found = this.allData.find(item => item.className === className);
    return found ? found.subjects : [];
  }


  getChaptersBySubject(subjects: ChapterList[], subjectName: string): ChapterData[] {
    const found = subjects.find(sub => sub.subject === subjectName);
    return found ? found.chapters : [];
  }


  getTopicsByChapter(chapters: ChapterData[], chapterName: string): Topic[] {
    const found = chapters.find(ch => ch.chapterName === chapterName);
    return found ? found.topics : [];
  }

 
  getContentByTopic(topics: Topic[], topicName: string): string {
    const found = topics.find(t => t.topicName === topicName);
    return found ? found.content : '';
  }

  getAllTopicsBySubject(subjects: ChapterList[], subjectName: string): Topic[] {
    const found = subjects.find(sub => sub.subject === subjectName);
    if (!found) return [];

    return found.chapters.reduce((allTopics: Topic[], chapter) => {
      return allTopics.concat(chapter.topics);
    }, []);
  }

  getShowContent(): boolean {
    return this.showContent;
  }
  setContent(condition: boolean, data: string |null) {
    this.showContent = condition;
    this.contentData = data ?? '';
  }
  getContentData(): string {          
  return this.contentData;
}
  
}

