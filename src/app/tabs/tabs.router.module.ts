import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },
            { path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' }

        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
  