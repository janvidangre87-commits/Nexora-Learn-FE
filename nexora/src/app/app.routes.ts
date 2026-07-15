import { Routes } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course';
import { AddCurriculuamComponent } from './add-curriculuam/add-curriculuam';
import { AddSectionComponent } from './add-section/add-section';

import { LayoutComponent } from './layout/layout';
import { AddLectureComponent } from './add-lecture/add-lecture';
import { ImportNotesComponent } from './import-notes/import-notes';
import { CreateNewSection } from './create-new-section/create-new-section';

export const routes: Routes = [
    {
        path:'',redirectTo:"layout",pathMatch:'full'
    },
    {
        path:'layout',component:LayoutComponent,children:[
            {
                
                path:'create',component:CreateCourseComponent,children:[
                    
                    {
                        path:'add-curriculuam',component:AddCurriculuamComponent
                    },
                    {
                        path:'add-section',component:AddSectionComponent
                    },
                    {
                        path:'create-new-section',component:CreateNewSection
                    },
                    {
                        path:'add-lecture',component:AddLectureComponent
                    },
                    {
                        path:'import-notes',component:ImportNotesComponent
                    }
                ]
            },
        ]
    },
   
];
