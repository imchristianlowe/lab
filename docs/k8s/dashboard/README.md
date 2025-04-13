## Install

```aiignore
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard \
    --create-namespace --namespace kubernetes-dashboard --values dashboard/values.yml
```

Create external load balancer to access dashboard

```aiignore
kubectl apply -f dashboard/dashboard-user.yml
kubectl apply -f dashboard/dashboard-user-rbac.yml
kubectl -n kubernetes-dashboard create token admin-user
```

Can connect with

```aiignore
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
```

Access in browser at https://localhost:8443

Or if the dashboard was created with the values.yml file you can access it in the browser using the external ip of the load balancer
