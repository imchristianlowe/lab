# Kubernetes

## Local

I use kind to run kubernetes locally. And because I'm on Mac I need [this](https://github.com/chipmk/docker-mac-net-connect?tab=readme-ov-file#installation) nifty tool... that will be explained later.

```aiignore
# Install via Homebrew
$ brew install chipmk/tap/docker-mac-net-connect

# Run the service and register it to launch at boot
$ sudo brew services start chipmk/tap/docker-mac-net-connect
```

Install the k8s dashboard with helm

```aiignore
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --namespace kubernetes-dashboard
```

This performs some sort of magic that allows me to define things like this in the `k8s/dashboard-lb-service.yml`

and when I apply the helm chart with

```aiignore
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --namespace kubernetes-dashboard -f dashboard-values.yml
```

when I run

```aiignore
kubectl get services -n kubernetes-dashboard
```

and see

```aiignore
NAME                                   TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
kubernetes-dashboard-api               ClusterIP      10.96.230.175   <none>        8000/TCP        6h
kubernetes-dashboard-auth              ClusterIP      10.96.68.80     <none>        8000/TCP        6h
kubernetes-dashboard-kong-proxy        LoadBalancer   10.96.147.213   172.29.0.9    443:32040/TCP   6h
kubernetes-dashboard-metrics-scraper   ClusterIP      10.96.56.194    <none>        8000/TCP        6h
kubernetes-dashboard-web               ClusterIP      10.96.216.86    <none>        8000/TCP        6h
```

I know I can access my kubernetes dashboard in my browser by visiting http://172.29.0.9

Cilium installed with helm. https://docs.cilium.io/en/stable/installation/k8s-install-helm/

### Links

- [kind cilium load balancer](https://fence-io.github.io/website/articles/networking/setting-up-load-balancer-service-with-cilium-in-kind-cluster/#containers-networking-on-macos)
-

See all spec variables

```aiignore
kubectl explain CiliumL2AnnouncementPolicy.spec --recursive
```

See all resource types

```aiignore
kubectl api-resources
```
