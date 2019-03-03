package com.scienceGateway.nineToFiveIt;

import com.scienceGateway.nineToFiveIt.zooKeeper.ZooKeeperConnection;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.ZooKeeper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.InetAddress;

@SpringBootApplication
public class Application {

	public static void main(String[] args) throws InterruptedException, KeeperException, IOException {
		SpringApplication.run(Application.class, args);
		ZooKeeperConnection zooKeeperConnection=new ZooKeeperConnection();

		ZooKeeper zoo=zooKeeperConnection.connect("149.165.171.39");

		String hostname = InetAddress.getLocalHost().getHostAddress();

		zooKeeperConnection.create("/ensemble/addProjects",(hostname+":8080").getBytes());
	}

}

