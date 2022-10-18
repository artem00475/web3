package Base;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class DataBaseController {

    public static void add(double x,double y,int r,boolean hit) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("database");
        EntityManager entityManager = factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        Coordinates coordinates = new Coordinates();
        coordinates.setX(x);
        coordinates.setY(y);
        coordinates.setR(r);
        coordinates.setHit(hit);

        entityManager.persist(coordinates);

        transaction.commit();
        entityManager.close();
        factory.close();
    }
}
