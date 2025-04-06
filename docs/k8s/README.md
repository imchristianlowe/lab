# Kubernetes

## Local

I use kind to run kubernetes locally. I also need the `kind-cloud-provider`

```aiignore
brew install kind-cloud-provider
sudo kind-cloud-provider
```

This performs some sort of magic that allows me to define things like this in the `k8s/dashboard-values.yml`

```aiignore
kong:
  proxy:
    type: LoadBalancer
```

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
