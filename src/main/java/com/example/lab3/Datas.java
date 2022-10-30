package com.example.lab3;

import Base.DataBaseController;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;

@ManagedBean(eager = true)
@ApplicationScoped
public class Datas {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private static ArrayList<Data> dates = new ArrayList<>();

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public ArrayList<Data> getDates() {
        return dates;
    }

    public void setDates(ArrayList<Data> dates) {
        Datas.dates = dates;
    }

    public void addData() {
        check();
        Data data = new Data(x,y,r,hit);
        System.out.println(data);
        dates.add(data);
        DataBaseController.add(x,y,r,hit);
    }

    public void check() {
        if (firstQaurter()||secondQaurter()||forthQuarter()) hit=true;
        else hit=false;
        //data.addData(this);
    }

    protected boolean firstQaurter() {
        if (x>=0 & y>=0 & x*x+y*y<=(r/2)*(r/2)) {
            return true;
        }
        return false;
    }

    protected boolean secondQaurter() {
        if (y>=0 & x<=0 & y<=x/2+r/2) return true;
        return false;
    }

    protected boolean forthQuarter() {
        if (y<=0 & x>=0 & x<=r/2 & y>=-r) return true;
        return false;
    }




}
