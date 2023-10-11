import { Component, OnInit } from '@angular/core';

declare function filterTable(value : string) : void;
declare function filterTableStatus(value : string) : void;
declare function filterByVIN(value : string) : void;
declare function populateElements() : void;
declare function updateFilterOptions() : void;
declare function populateFilters() : void;
declare function deleteFilter() : void;
declare function showAllEntries() : void;
declare function recalculateFilters() : void;
declare function updateCSSDisplay(component : string, value : string) : void;
declare function updateCSSWidth(component : string, value : string) : void;
let filterMap = new Map<string, string>();

@Component({
  selector: 'app-vehicle-filters',
  templateUrl: './vehicle-filters.component.html',
  styleUrls: ['./vehicle-filters.component.css']
})
export class VehicleFiltersComponent implements OnInit {
  

  constructor() {
    this.deleteFilter = this.deleteFilter.bind(this); 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    this.populateElements();
    this.updateFilterOptions();

    document.addEventListener('click', (event) => {
      let button = event.target as HTMLInputElement;
      if(button.id=="1"){
        this.deleteFilter(event);
      }else if(button.id=="2"){
        this.deleteFilter(event);
      }else if (button.id =="3"){
        this.deleteFilter(event);
      }
    });
  }

  filterTable(value : string) {
    const tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td");

      if (td.length !== 0 && tr[i].style.display=="") {
        const txtValue = td[1].textContent || td[1].innerText;

        if (txtValue.toUpperCase().indexOf(value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  filterTableStatus(value : string) {
    const tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td");

      if (td.length !== 0 && tr[i].style.display=="") {
        const txtValue = td[2].textContent || td[2].innerText;

        if (txtValue.toUpperCase().indexOf(value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }

      }
    }
  }

  filterByVIN(value : string) {
    const tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td");

      if (i !== 0 && tr[i].style.display=="") {
        const txtValue = td[0].textContent || td[0].innerText;

        if (txtValue.includes(value)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  showAllEntries() {
    const tr = document.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td");

      if (i !== 0) {
        const txtValue = td[0].textContent || td[0].innerText;
          tr[i].style.display = "";
      }
    }
  }

  populateElements() {
    (<HTMLInputElement>document.getElementById("filterBy")).innerHTML = `
      <option>Location</option>
      <option>Status</option>
      <option>VIN</option>
    `;
    (<HTMLSelectElement>document.getElementById("filterBy")).selectedIndex = 2;
  }

   updateFilterOptions() {
    if ((<HTMLInputElement>document.getElementById("filterBy")).value == "Location") {

      this.updateCSSDisplay("statusFilter", "none");
      this.updateCSSDisplay("vinFilter", "none");
      this.updateCSSDisplay("locationFilter", "inline-block");
      this.updateCSSWidth("locationFilter", "55%");
      this.updateCSSWidth("filterBy", "30%");

    } else if ((<HTMLInputElement>document.getElementById("filterBy")).value == "Status") {
      this.updateCSSDisplay("statusFilter", "inline-block");
      this.updateCSSDisplay("vinFilter", "none");
      this.updateCSSDisplay("locationFilter", "none");
      this.updateCSSWidth("statusFilter", "55%");
      this.updateCSSWidth("filterBy", "30%");

    } else if ((<HTMLInputElement>document.getElementById("filterBy")).value == "VIN") {
      this.updateCSSDisplay("statusFilter", "none");
      this.updateCSSDisplay("vinFilter", "inline-block");
      this.updateCSSDisplay("locationFilter", "none");
      this.updateCSSWidth("vinFilter", "55%");
      this.updateCSSWidth("filterBy", "30%");
    }
    this.populateFilters();
  }

  updateCSSDisplay(component : string, value : string){
    (<HTMLInputElement>document.getElementById(component)).style.display = value
  }
  updateCSSWidth(component : string, value : string){
    (<HTMLInputElement>document.getElementById(component)).style.width = value
  }

  populateFilters() {
    let locations = new Set();
    let status = new Set();
    let tr = document.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td");
      if (td.length != 0) {
        let locationsIter = td[1].textContent || td[1].innerText;
        let statusIter = td[2].textContent || td[2].innerText;
        locations.add(locationsIter);
        status.add(statusIter);
      }
    }
    
    locations.forEach(locations => {
      (<HTMLInputElement>document.getElementById("locationFilter")).innerHTML += `<option>` + locations + `</option>`
    });
    status.forEach(status => {
      (<HTMLInputElement>document.getElementById("statusFilter")).innerHTML += `<option>` + status + `</option>`
    });
  }
  filterBtnClick(){
    switch((<HTMLInputElement>document.getElementById("filterBy")).value){
      case "VIN": 
      if(!filterMap.has("VIN")){
          (<HTMLInputElement>document.getElementById("dynamicFiltersApplied")).innerHTML +=`<span class="badge bg-dark badge-pill" style="color:white; font-weight:bold">VIN: `+ (<HTMLInputElement>document.getElementById("vinFilter")).value +`&nbsp;<button id="1" style="border-radius: 50%; scale: 0.7; " class="btn btn-danger btn-close"></button></span> &nbsp;`;
          filterMap.set("VIN", (<HTMLInputElement>document.getElementById("vinFilter")).value);
          this.recalculateFilters();  
        }else{
          alert("You have already filtered by VIN!");
        }
        
        break;
      case "Location": 
      if(!filterMap.has("Location")){
        (<HTMLInputElement>document.getElementById("dynamicFiltersApplied")).innerHTML +=`<span class="badge bg-dark badge-pill" style="color:white; font-weight:bold">Location: `+ (<HTMLInputElement>document.getElementById("locationFilter")).value +`&nbsp;<button id="2" style="border-radius: 50%; scale: 0.7;" class="btn btn-danger btn-close"></button></span> &nbsp;`;
        filterMap.set("Location", (<HTMLInputElement>document.getElementById("locationFilter")).value);
        this.recalculateFilters();  
        
      }else{
        alert("You have already filtered by Location!")
      }
        break;
        case "Status": 
        if(!filterMap.has("Status")){
          (<HTMLInputElement>document.getElementById("dynamicFiltersApplied")).innerHTML +=`<span class="badge bg-dark badge-pill" style="color:white; font-weight:bold">Status: `+ (<HTMLInputElement>document.getElementById("statusFilter")).value +`&nbsp;<button  id="3" style="border-radius: 50%; scale: 0.7;" class="btn btn-danger btn-close"></button></span> &nbsp;`;
          filterMap.set("Status", (<HTMLInputElement>document.getElementById("statusFilter")).value);
          this.recalculateFilters();  
        }else{
          alert("You have already filtered by Status!")
        }
        break;
      default:
        return;
    } 
      }
  
  deleteFilter(event : Event){
    const element = event.target as HTMLButtonElement;
    console.log("delete")
    if(element.parentElement?.outerText?.includes("VIN:")){
      filterMap.delete("VIN");
      element.parentElement?.remove();
      this.recalculateFilters();  
    }else if(element.parentElement?.outerText?.includes("Status:")){
      filterMap.delete("Status");
      element.parentElement?.remove();
      this.recalculateFilters();  
    }else if(element.parentElement?.outerText?.includes("Location:")){
      filterMap.delete("Location");
      element.parentElement?.remove();    
      this.recalculateFilters();  
    }
    if(filterMap.size == 0){
      this.showAllEntries()
    }
  }

  recalculateFilters(){
    this.showAllEntries();
    filterMap.forEach((value, key) => {
      if(key.includes("Location")){
        this.filterTable(value);
      }else if(key.includes("VIN")){
        this.filterByVIN(value);
      }else if(key.includes("Status")){
        this.filterTableStatus(value);
      }
    })
  }
 
}

