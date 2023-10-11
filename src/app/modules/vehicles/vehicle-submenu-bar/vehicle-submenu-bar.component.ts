import { Component, OnInit } from '@angular/core';
import { globals } from 'src/app/app.component';
import { Menu } from 'src/app/core/models/menu.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehicle-submenu-bar',
  templateUrl: './vehicle-submenu-bar.component.html',
  styleUrls: ['./vehicle-submenu-bar.component.css']
})
export class VehicleSubmenuBarComponent implements OnInit {

  menus?: Array<Menu> = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    globals.common.pageMenus.forEach((page: any) => {
      if (page.pageCode == "4") {
        this.menus = this.userService.mapMenus(page.menus, globals.text.admin.menus);
      }
    });
  }

}
