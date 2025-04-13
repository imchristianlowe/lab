## Install

```aiignore
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
```

Create external load balancer to access dashboard

```aiignore
kubectl apply -f dashboard/dashboard-lb-service.yml
kubectl apply -f dashboard/dashboard-user.yml
kubectl apply -f dashboard/dashboard-user-rbac.yml
kubectl -n kubernetes-dashboard create token admin-user
```
