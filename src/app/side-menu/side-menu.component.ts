import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  files!: TreeNode[];
  filelist: any[]=[];
  ngOnInit() {
    this.filelist=[
      {
        key: '0',
        label: 'Prescription',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-file',
        children: [
            {
                key: '0-0',
                label: 'Prescription 1',
                data: 'Work Folder',
                icon: 'pi pi-fw pi-file',
            },
            {
              key: '0-0',
              label: 'Prescription 2',
              data: 'Work Folder',
              icon: 'pi pi-fw pi-file',
          },
          {
            key: '0-0',
            label: 'Prescription 3',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-file',
        }
            
        ]
    },
  
    ];
  }
}
