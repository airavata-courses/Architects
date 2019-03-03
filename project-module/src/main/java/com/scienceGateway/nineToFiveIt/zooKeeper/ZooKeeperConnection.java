package com.scienceGateway.nineToFiveIt.zooKeeper;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

public class ZooKeeperConnection {

   private ZooKeeper zoo;
   final CountDownLatch connectedSignal = new CountDownLatch(1);

   // Method to connect zookeeper ensemble.
   public ZooKeeper connect(String host) throws IOException,InterruptedException {

      zoo = new ZooKeeper(host,5000,new Watcher() {

         public void process(WatchedEvent we) {

            if (we.getState() == Watcher.Event.KeeperState.SyncConnected) {
               connectedSignal.countDown();
            }
         }
      });

      connectedSignal.await();
      return zoo;
   }

   public String create(String path, byte[] data) throws KeeperException,InterruptedException {

      final Stat nodeStat= zoo.exists(path,false);
      String retPath;
      if(nodeStat==null){
         retPath=zoo.create(path, data, ZooDefs.Ids.OPEN_ACL_UNSAFE,
                 CreateMode.EPHEMERAL);
      }
      else{
         retPath=path;
      }
      return retPath;
   }



   // Method to disconnect from zookeeper server
   public void close() throws InterruptedException {
      zoo.close();
   }
}
