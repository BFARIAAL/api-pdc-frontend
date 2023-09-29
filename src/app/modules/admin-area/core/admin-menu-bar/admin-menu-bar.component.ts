import { Component, OnInit } from '@angular/core';
import { globals } from 'src/app/app.component';
import { Menu } from 'src/app/core/models/menu.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-menu-bar',
  templateUrl: './admin-menu-bar.component.html',
  styleUrls: ['./admin-menu-bar.component.css']
})
export class AdminMenuBarComponent implements OnInit {
  /**
     * A list with all the menus that we need to add to the menu bar
     */
  menus?: Array<Menu> = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    /**
     * We need to load the secondary menu bar componenets along with the language
     */
    globals.startLoading("loadingAdminDashboard");
    globals.common.pageMenus.forEach((page: any) => {
      if (page.pageCode == "4") {
        this.menus = this.userService.mapMenus(page.menus, globals.text.admin.menus);
      }
    });;
    globals.stopLoading("loadingAdminDashboard");
  }

}
