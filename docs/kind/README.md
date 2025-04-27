# KinD Cluster

Run a local High Availability (HA) cluster using the following command from the project root

```aiignore
kind create cluster --config kind/cluster.yml
```

The cluster is configured without the default CNI or Kube Proxy as Cilium is used to replace the functionality of both.

Cilium can be installed using helm and the values found in `k8s/cilium/cilium-kind-values.yml`

```aiignore
helm install cilium cilium/cilium --version 1.17.2 \
    --namespace kube-system --values k8s/cilium/cilium-kind-values.yml
```

For information regarding all of the possible values for the Cilium helm chart, refer to the official docs [here](https://docs.cilium.io/en/stable/helm-reference/).

Monitor the cilium deployment status

```aiignore
cilium status --wait
```

Deploy the cilium load balancer config

```aiignore
kubectl apply -f k8s/cilium/cilium-lb.yml
```

This will allow cilium to provision bare metal load balancers to route to Kubernetes deployments.

Deploy the pihole service

```aiignore
kubectl apply -f k8s/pihole/manifest.yml
```

Deploy the external dns service

```aiignore
kubectl apply -f k8s/external-dns/manifest.yml
```

Deploy the keycloak service

```aiignore
kubectl apply -f k8s/keycloak/manifest.yml
```

Deploy Dashy

```

```
