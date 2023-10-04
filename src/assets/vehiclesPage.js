function filterTable(){
  let tr = document.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if (td.length!=0) {
        txtValue = td[1].textContent || td[1].innerText;
        if (txtValue.toUpperCase().indexOf(locationFilter.value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
        if (locationFilter.value == "Select Option") {
          tr[i].style.display = "";
        }
      }
    }
}


function filterByVIN(){
  let tr = document.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if (i!=0) {
        txtValue = td[0].textContent || td[0].innerText;
        if (txtValue.includes(vinFilter.value.toUpperCase())) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
        if (vinFilter.value == "") {
          tr[i].style.display = "";
        }

      }
    }
}