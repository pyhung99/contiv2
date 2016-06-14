# volplugin
Contiv Volume plugin [volplugin](https://github.com/contiv/volplugin "Title")
is a Ceph volume driver, and policy system that works well within a Docker
ecosystem. It can automatically move your storage with your containers, rather
than pinning containers to specific hosts to take advantage of their storage.

## Getting started

Getting started describes setting up a test environment with three VMs. Once
the test environment is setup see the [**Configure Services**](#Configure Services).

#### Prerequisites

Please read and follow the instructions in the prerequisites section of the
volplugin
[README](https://github.com/contiv/volplugin/blob/master/README.md#prerequisites)
before completing the following:

### Clone and build the project

### On Linux (without a VM)

Clone the project:

```
git clone https://github.com/contiv/volplugin
```

Build the project:

```
make run-build
```


The command `make run-build` installs utilities for building the software in
the `$GOPATH`, as well as the `volmaster`, `volplugin` and `volcli` utilities.

### Everywhere else (with a VM):

Clone the project:

```
git clone https://github.com/contiv/volplugin
```


Build the project:

```
make start
```


The build and binaries will be on the VM in the following directory `/opt/golang/bin`.

## Do it yourself

### Installing Dependencies

Use the Contiv [nightly releases](https://github.com/contiv/volplugin/releases)
when following these steps:

**Note:** Using the nightly builds is simpler than building the applications.

Install the dependencies in the following order:

1. Follow the [Getting Started](https://github.com/coreos/etcd/releases/tag/v2.2.0) to install [Etcd](https://coreos.com/etcd/docs/latest/getting-started-with-etcd.html).
  * Currently versions 2.0 and later are supported.

2. Follow the [Ceph Installation Guide](http://docs.ceph.com/docs/master/install/) to install [Ceph](http://ceph.com).
3. Configure Ceph with [Ansible](https://github.com/ceph/ceph-ansible).

  **Note**: See the [README](https://github.com/contiv/volplugin/blob/master/README.md#running-the-processes)
  for pre-configured VMs that work on any UNIX operating system to simplify
    Ceph installation.

4. Upload a global configuration. You can find an example one [here](https://github.com/contiv/volplugin/blob/master/systemtests/testdata/global1.json)

5. Start volmaster in debug mode (as root):

```
volmaster &
```

**Note**: volmaster debug mode is very noisy and is not recommended. Therefore,
avoid using it with background processes. volplugin currently connects to
volmaster using port 9005, however in the future it is variable.

6. Start volsupervisor (as root):

```
volsupervisor &
```


**Note**: volsupervisor debug mode is very noisy and is not recommended.

7.  Start volplugin in debug mode (as root):

```
volplugin &
```

If running volplugin on multiple hosts, use the `--master` flag to
provide a ip:port pair to connect to over http. By default it connects to
`127.0.0.1:9005`.

## Configure Services

Ensure Ceph is fully operational, and that the `rbd` tool works as root.

Upload a policy:

```
volcli policy upload policy1
```


**Note**: It accepts the policy from stdin, e.g.: `volcli policy upload policy1 < mypolicy.json`
Examples of a policy are in [systemtests/testdata](https://github.com/contiv/volplugin/tree/master/systemtests/testdata).

### Creating a container with a volume


Create a volume that refers to the volplugin driver:

```
docker volume create -d volplugin --name policy1/test
```

**Notes**:

* `test` is the name of the volume, and is located under policy `policy1`,
 which is uploaded with `volcli policy upload.`
* The volume will inherit the properties of the policy. Therefore, the
volume will be of appropriate size, iops, etc.
* There are numerous options (see below) to declare overrides of most parameters in the policy configuration.
* Run a container that uses the policy:

```
docker run -it -v policy1/test:/mnt ubuntu bash
```
* Run `mount | grep /mnt` in the container.


**Note**: `/dev/rbd#`should be attached to that directory.

* Once a multi-host system is setup, anytime the volume is not mounted, it
can be mounted on any host that has a connected rbd client available, and
volplugin running.
