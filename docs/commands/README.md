## Backup Docker Volume

```aiignore
docker run --rm \
      -v "clowe-app-db-data":/backup-volume \
      -v "$(pwd)":/backup \
      busybox \
      tar -zcvf /backup/my-backup.tar.gz /backup-volume
```

## Unzip Backed Up Docker Volume

```aiignore
docker run --rm -v "$(pwd)":/unzipped busybox tar -xzvf /unzipped/my-backup.tar.gz -C /unzipped
```

Monitor packets on port with tcpdump (CLI)

```aiignore
tcpdump -n -v -i any port 53
```

Install tcpdump on alpine

```aiignore
apk update
apk fetch tcpdump
apk add tcpdump*
```
