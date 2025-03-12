# Ansible Playbooks

Be sure to have your ansible config created. See [these](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) docs to get started creating your config.

Creating an ansible config is outside the scope of this documentation and is better left to the official ansible documentation.

When you define your hosts, be sure to include a group named `clowe-app-webservers`. These are the hosts that will get the docker containers created.

## single-debian.yml

Use this playbook to deploy the service to a single server whether it's an EC2 Instance, Digital Ocean Droplet, GCP Compute Engine, Azure Virtual Machine, etc.

Great for testing or small deployments. For instance if you're just running it for yourself or a handful of people.

From the root directory run

```
ansible-playbook ansible/single-debian.yml
```

If you want to use a cloudflare tunnel to access the docker container externally

```
ansible-playbook -e run_cloudflare_container=true -e tunnel_token=${TOKEN} ansible/single-debian.yml
```

Setting up a user with the correct permissions to become root on the remote host is currently outside the scope of this tutorial.
