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
