## Debugging

Drop into the pihole dns container and perform a dns query to confirm it's working

```
kubectl exec -it $(kubectl get pods -l app=pihole -o name -n pihole-dns) -n pihole-dns -- /bin/bash
nslookup google.com 127.0.0.1
```

Running a debug netcat/nslookup/nmap container

```aiignore
kubectl run -it --rm --restart=Never debug --image=nicolaka/netshoot -n pihole-dns -- bash
```
