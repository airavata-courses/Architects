package com.scienceGateway.nineToFiveIt.zooKeeper;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.ZooDefs;
import org.apache.zookeeper.ZooKeeper;

public class ZkCreate {
    private static ZooKeeper zk;

    // create static instance for ZooKeeperConnection class.
    private static ZooKeeperConnection conn;

    // Method to create znode in zookeeper ensemble
    public static void create(String path, byte[] data) throws KeeperException,InterruptedException {
        zk.create(path, data, ZooDefs.Ids.OPEN_ACL_UNSAFE,
                CreateMode.EPHEMERAL);
    }

/*    public static void main(String[] args) {

        // znode path
        String path = "/MyFirstZnode"; // Assign path to znode

        // data in byte array
        byte[] data = "My first zookeeper app”.getBytes();

        try {
            conn = new ZooKeeperConnection();
            zk = conn.connect("localhost");
            create(path, data); // Create the data to the specified path
            conn.close();
        } catch (Exception e) {
            System.out.println(e.getMessage()); //Catch error message
        }
    }*/
}
