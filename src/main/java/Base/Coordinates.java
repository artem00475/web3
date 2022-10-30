package Base;

import javax.persistence.*;

@Entity
@Table(name="Results")
@NamedQuery(name = "AllResults", query = "select r from Coordinates r")
public class Coordinates {
    @Id
    @GeneratedValue
    private int id;
    @Basic
    private double x;
    @Basic
    private double y;
    @Basic
    private double r;
    @Basic
    private boolean hit;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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
}
