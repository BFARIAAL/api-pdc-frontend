package com.jlr.ttl.d42.pdp.api;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jlr.ttl.d42.pdp.api.Entities.Location;
import com.jlr.ttl.d42.pdp.api.Entities.Vehicle;
import com.mysql.cj.jdbc.result.ResultSetImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
public class Controller {
    @GetMapping(value = "/")
        public ModelAndView page(){
            ModelAndView modelAndView = new ModelAndView("homepage");
            modelAndView.getModel().put("data","Welcome to the Load Management System!");
            return modelAndView;
        }


    @GetMapping(value = "/add-vehicle")
    public ModelAndView addVehiclePage() throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        ResultSet rs = DBService.getData("SELECT Loc_Code FROM locations",conn);
        ModelAndView mv = new ModelAndView("addVehicle");
        List<String> locCode = new ArrayList<>();
        if(((ResultSetImpl)rs).getUpdateCount()!=0){
            while (rs.next())
            {
                locCode.add(rs.getString("loc_code"));
            }

        }
        mv.getModel().put("options", locCode);
        mv.addObject("options",locCode);
        return mv;
    }

    @RequestMapping(value = "/register-car")
    public ResponseEntity<String> registerCar(HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        try {
            DBService.insertDB("INSERT INTO vehicles VALUES (" + request.getParameter("vin") + ", " + request.getParameter("loc_code") + ")", conn);
        }catch(Exception ex){
            return new ResponseEntity<>("Request Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Car Added!", HttpStatus.OK);
    }

    @RequestMapping(value = "/vehicles/all")
    public ResponseEntity<List<Vehicle>> getAllCars(HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        List<Vehicle> vehicles = new ArrayList<>();
        try{
            ResultSet rs = DBService.getData("SELECT * FROM vehicles",conn);
            if(((ResultSetImpl)rs).getUpdateCount()!=0){
                while (rs.next())
                {
                    Vehicle newCar = new Vehicle();
                    newCar.setVin(rs.getString("VIN"));
                    newCar.setLocCode(rs.getString("loc_code"));
                    vehicles.add(newCar);
                }

            }
        }catch(Exception ex){
            System.out.println(ex);
        }
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @RequestMapping(value = "/vehicle/{id}")
    public ResponseEntity<List<Vehicle>> filterCars(@PathVariable String id) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        List<Vehicle> vehicles = new ArrayList<>();
        try{
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM vehicles WHERE VIN LIKE ?");
            ps.setString(1, id + "%");
            ResultSet rs = DBService.getDataPS(ps,conn);
            if(((ResultSetImpl)rs).getUpdateCount()!=0){
                while (rs.next())
                {
                    Vehicle newCar = new Vehicle();
                    newCar.setVin(rs.getString("VIN"));
                    newCar.setLocCode(rs.getString("loc_code"));
                    vehicles.add(newCar);
                }

            }
        }catch(Exception ex){
            System.out.println(ex);
        }
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    //GET Location ---

    @GetMapping(value = "/add-location")
    public ModelAndView addLocationPage() throws SQLException {

        return new ModelAndView("addLocation");
    }

    @RequestMapping(value = "/register-location")
    public ResponseEntity<String> registerLocation(HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        try {
            DBService.insertDB("INSERT INTO locations (Loc_code) VALUES ('" +request.getParameter("loc_code") + "');", conn);
        }catch(Exception ex){
            return new ResponseEntity<>("Request Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Location Added!", HttpStatus.OK);
    }
    @RequestMapping(value = "/locations/all")
    public ResponseEntity<List<Location>> getAllLocations(HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        List<Location> locations = new ArrayList<>();
        try{
            ResultSet rs = DBService.getData("SELECT * FROM Locations",conn);
            if(((ResultSetImpl)rs).getUpdateCount()!=0){
                while (rs.next())
                {
                    Location newLocation = new Location();
                    newLocation.setLocCode(rs.getString("loc_code"));
                    locations.add(newLocation);
                }

            }
        }catch(Exception ex){
            System.out.println(ex);
        }
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }


    @RequestMapping(value = "/location/{id}")
    public ResponseEntity<List<Location>> filterLocation(@PathVariable String id) throws SQLException {

        Connection conn = DBService.DBConn();
        assert conn != null;
        List<Location> locations = new ArrayList<>();
        try{
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM locations WHERE loc_code LIKE ?");
            ps.setString(1, id + "%");
            ResultSet rs = DBService.getDataPS(ps,conn);
            if(((ResultSetImpl)rs).getUpdateCount()!=0){
                while (rs.next())
                {
                    Location newLocation = new Location();
                    newLocation.setLocCode(rs.getString("loc_code"));
                    locations.add(newLocation);
                }

            }
        }catch(Exception ex){
            System.out.println(ex);
        }
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }
    //---- End of GET LOCATION

   //---- Load Create
   @GetMapping(value = "/load-create")
   public ModelAndView addLoad() throws SQLException {

       return new ModelAndView("LoadCreate");
   }

    @GetMapping(value = "/get-cars-available-load")
    public ResponseEntity<List<Vehicle>> getCarsAvailableLoad() throws SQLException {
        Connection conn = DBService.DBConn();
        assert conn != null;
        PreparedStatement ps = conn.prepareStatement("SELECT * FROM vehicles");
        List<Vehicle> availableVehicles= new ArrayList<>();
        ResultSet rs = DBService.getDataPS(ps,conn);
        if(((ResultSetImpl)rs).getUpdateCount()!=0 && ((ResultSetImpl)rs).getUpdateCount()!=-1 ){
            while (rs.next())
            {
                PreparedStatement ps1 = conn.prepareStatement("SELECT * FROM vehicle_loads WHERE VIN='"+ rs.getString("vin")+"'");
                ResultSet rs1 = DBService.getDataPS(ps1,conn);
                while((!rs1.isLast() && ((ResultSetImpl)rs1).getUpdateCount()!=0) || ((!rs1.isLast() && ((ResultSetImpl)rs1).getUpdateCount()!=0) && ((ResultSetImpl)rs1).getUpdateCount() !=-1)){
                    rs1.next();
                }
                if(((ResultSetImpl)rs1).getUpdateCount()!=0){

                    if( !((ResultSetImpl) rs1).getLocalDateTime(4).isAfter(LocalDateTime.now())){
                        availableVehicles.add(new Vehicle(rs.getString("VIN"),rs.getString("loc_code")));
                    }
                }else{
                    availableVehicles.add(new Vehicle(rs.getString("VIN"),rs.getString("loc_code")));
                }
                rs1.close();
            }

        }

        return new ResponseEntity<>(availableVehicles,HttpStatus.OK);
    }

    //End of Load Create

}
