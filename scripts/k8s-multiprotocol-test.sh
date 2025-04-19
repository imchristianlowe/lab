#!/bin/bash

for i in {1..5}
  do
      IP=$(kubectl get services multiprotocol --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
      [[ ! -z "$IP" ]] && break || sleep 1
  done
  echo "IP: $IP"
POD=$(kubectl get pod -l app=multiprotocol -o jsonpath='{.items[0].metadata.name}')
echo "Pod $POD"
for i in {1..5}
do
    HOSTNAME=$(curl -s http://${IP}:80/hostname || true)
    [[ ! -z "$HOSTNAME" ]] && break || sleep 1
done
echo "Hostname via TCP: $HOSTNAME"
[  "$HOSTNAME" = "$POD" ]

for i in {1..5}
  do
      HOSTNAME=$(echo hostname | nc -u -w 3 ${IP} 80 || true)
      [[ ! -z "$HOSTNAME" ]] && break || sleep 1
  done
echo "Hostname via UDP: $HOSTNAME"
[[ ! -z "$HOSTNAME" ]] && [  "$HOSTNAME" = "$POD" ]
