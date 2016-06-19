---
layout: "install"
page_title: "Multicast"
sidebar_current: "getting-started-multicast"
description: |-
  Multicast in Contiv
---

# Demonstrating Multicast in Contiv
This page describes how to demonstrate multicast in a Contiv network.
There are two demonstrations: The first demonstrates mcast between
two containers; the second demonstrates multicast between a container
and a VM.

## Multicast Between Two Containers
In this demonstration, you run two containers on two separate VMs. 
You then create a VLAN network and run a sender and a receiver multicast application. 

### Step 1: Clone the Contiv Network Repository
Clone the Contiv Network repository from GitHub as follows:

```
$ git clone https://github.com/contiv/netplugin
$ cd netplugin
```

### Step 2: Create the VMs
Create the VMs and log into one of the VMs using the following commands:

```
$ make demo
$ vagrant ssh netplugin-node1
netplugin-node1~$
```

### Step 3: Create a Network
Use the following command to create a multicast-enabled network:

```
netplugin-node1~$ netctl net create contiv-net --encap=vlan --subnet=20.1.1.0/24 --gateway=20.1.1.254 --pkt-tag=1010
```

### Step 4: Start a Multicast Sender
On the same VM, run a Docker container and determine the IP address of its interface on the `contiv-net` network.  
The commands below start a new CentOS Docker container and display information about that container.
 (The `mcast.py` command does not return to a prompt.)

```
netplugin-node1~$ docker pull qiwang/centos7-mcast
netplugin-node1~$ docker run -it --name=msender --net=contiv-net qiwang/centos7-mcast /bin/bash
netplugin-node1~$ docker inspect msender
```
The `docker inspect` command displays a long list of information about the `msender` container.
Near the bottom is a `NetworkSettings` section. Find the container's IP address on the `contiv-net` network,
that is, `20.1.1.0/24`. Make a note of this IP address.

### Step 5: Start a Multicast Sender

The following commands log into the container and start the **mcast** application.
 (The `mcast.py` command does not return to a prompt.)

```
root@9f4e7fd418c5:/# cd /root
root@9f4e7fd418c5:/# ./mcast.py -s -i eth0
```

## Step 6: Log into the Other Node
In another shell window, log into the second VM (Node 2):

```vagrant ssh netplugin-node2```

### Step 7: Start a Multicast Receiver
On Node 2, Run a Docker container on the network and start the multicast receiver
as follows:

```
netplugin-node2~$ docker pull qiwang/centos7-mcast
netplugin-node2~$ docker run -it --name=mreceiver --net=contiv-net qiwang/centos7-mcast /bin/bash
root@564f7f4424c1:/# cd /root
root@564f7f4424c1:/# ./mcast.py -i eth0

('20.1.1.3', 35624)  '1453881422.973572'
('20.1.1.3', 35624)  '1453881423.977554'
('20.1.1.3', 35624)  '1453881424.978941'
```

Substitute the IP that you noted for the `msender` container if it is different from  `20.1.1.3`.

## Multicast Between a Container and a VM
In this demonstration, you run two separate VMs. 
You create a VLAN network and connect a bridge to the first VM and run a sender application on the VM.
Finally, you create a Docker container on the second VM and run a receiver application on that container.D

### Step 1: Create the VMs
Use the following commands to start the VMs and create a multicast-enabled network called `contiv-net`.

```
$ make demo
$ vagrant ssh netplugin-node1
netplugin-node1~$ netctl net create contiv-net --encap=vlan --subnet=20.1.1.0/24 --gateway=20.1.1.254 --pkt-tag=1010
```

### Step 2: Create a Port
Use the following commands to create a port on an Open vSwitch (OVS) with the network tag used for `contiv-net`:
```
netplugin-node1~$ sudo ovs-vsctl add-port contivVlanBridge inb01 -- set interface inb01 type=internal
netplugin-node1~$ sudo ovs-vsctl set port inb01 tag=1010
netplugin-node1~$ sudo ifconfig inb01 30.1.1.8/24
```

### Step 3: Launch a Multicast Sender Application
Download and launch the **mcast.py** sender application as follows:

```
netplugin-node1~$ git clone https://github.com/leslie-wang/py-multicast-example.git
netplugin-node1~$ cd py-multicast-example
netplugin-node1~$ sudo ./mcast.py -s -i inb01
```

### Step 4: Log into Node 2
In another shell window, log into Node 2:

```
$ vagrant ssh netplugin-node2
```

#### Step 5: Run a Docker Container 
Finally, run a Docker container in the `contiv-net` network, then launch the multicast receiver.
```
netplugin-node2~$ docker pull qiwang/centos7-mcast
netplugin-node2~$ docker run -it --name=mreceiver --net=contiv-net qiwang/centos7-mcast /bin/bash
root@426b8cdbf5f8:/# cd /root
root@426b8cdbf5f8:/# ./mcast.py -i eth0

('30.1.1.8', 35678)  '1453882966.102203'
('30.1.1.8', 35678)  '1453882967.120764'
('30.1.1.8', 35678)  '1453882968.12215'
```

