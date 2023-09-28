package com.jlr.ttl.d42.pdp.api;

import java.sql.*;

public class DBService {
    public static Connection DBConn(){

        try
        {
            // create our mysql database connection
            String myDriver = "com.mysql.jdbc.Driver";
            String myUrl = "jdbc:mysql://localhost:3306/new_schema";
            Class.forName(myDriver);
            Connection conn = DriverManager.getConnection(myUrl, "root", "Pedrosousa@123");
            return conn;
        }
        catch (Exception e)
        {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


    public static ResultSet getData(String query, Connection conn) throws SQLException {
        Statement st = conn.createStatement();
        return st.executeQuery(query);
    }
    public static ResultSet getDataPS(PreparedStatement query, Connection conn) throws SQLException {
        return query.executeQuery();
    }

    public static boolean insertDB(String query, Connection conn) throws SQLException {
        Statement st = conn.createStatement();
        return st.execute(query);
    }
}
