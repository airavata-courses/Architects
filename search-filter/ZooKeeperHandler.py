from kazoo.client import KazooClient
from kazoo.client import KazooState
from kazoo.client import KeeperState
from kazoo.exceptions import NodeExistsError, NoNodeError, ConnectionLossException
from flask import request, jsonify
from json import load
import requests
import json

# Zookeeper Service Registry
class ZookeeperHandler:
    def registerAuthService(self,host,port):
        zk = KazooClient(hosts=host+":"+port, read_only=True)
        zk.start()
        path = '/ensemble/find'
        host= str(requests.get('https://ip.42.pl/raw').text) # AuthServices
        pass_data=json.dumps({"host":host, "port":port}).encode('utf-8')
        try:
            zk.create(path,value=pass_data, ephemeral=True, makepath=True)
        except NodeExistsError:
            print("Node already exists")
