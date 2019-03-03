package com.scienceGateway.nineToFiveIt;

import com.scienceGateway.nineToFiveIt.zooKeeper.ZooKeeperConnection;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.ZooKeeper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;

@SpringBootApplication
public class Application {

	public static void main(String[] args) throws InterruptedException, KeeperException, IOException {
		SpringApplication.run(Application.class, args);
		ZooKeeperConnection zooKeeperConnection=new ZooKeeperConnection();

		ZooKeeper zoo=zooKeeperConnection.connect("149.165.171.39");

		String systemipaddress = "";
		try
		{
			URL url_name = new URL("http://bot.whatismyipaddress.com");

			BufferedReader sc =
					new BufferedReader(new InputStreamReader(url_name.openStream()));

			// reads system IPAddress
			systemipaddress = sc.readLine().trim();
		}
		catch (Exception e)
		{
			systemipaddress = "Cannot Execute Properly";
		}
		System.out.println("Public IP Address: " + systemipaddress +"\n");
		zooKeeperConnection.create("/ensemble/addProjects",(systemipaddress+":8080").getBytes());
	}

}

