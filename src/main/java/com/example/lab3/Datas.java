package com.example.lab3;

import Base.DataBaseController;

import java.util.ArrayList;

public class Datas {
    private static ArrayList<Data> dates = new ArrayList<>();


    public ArrayList<Data> getDates() {
        return dates;
    }

    public void setDates(ArrayList<Data> dates) {
        Datas.dates = dates;
    }

    public void addData(Shot shot) {
        Data data = new Data(shot.getX(), shot.getY(), shot.getR(), false);
        check(data);
        System.out.println(data.getX());
        dates.add(data);
        DataBaseController.add(data.getX(), data.getY(), data.getR(), data.isHit());
    }

    public void check(Data data) {
        if (firstQaurter(data.getX(), data.getY(), data.getR())||secondQaurter(data.getX(), data.getY(), data.getR())||forthQuarter(data.getX(), data.getY(), data.getR())) data.setHit(true);
        else data.setHit(false);
    }

    protected boolean firstQaurter(double x, double y, double r) {
        if (x>=0 & y>=0 & x*x+y*y<=(r/2)*(r/2)) {
            return true;
        }
        return false;
    }

    protected boolean secondQaurter(double x, double y, double r) {
        if (y>=0 & x<=0 & y<=x/2+r/2) return true;
        return false;
    }

    protected boolean forthQuarter(double x, double y, double r) {
        if (y<=0 & x>=0 & x<=r/2 & y>=-r) return true;
        return false;
    }




}
