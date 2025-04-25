# Welcome to My Lab

For more information about me and other projects visit [christianlowe.com](https://www.christianlowe.com).

## Project layout

    .github/       # Github configuration, workflows, etc
    ansible/       # Ansible Playbooks
    bruno/         # Bruno API Requests
    docker/        # Docker compose files
    docs/          # Docs
    drf/           # Django REST Framework Playground
    expo/          # Expo Playground
    infra/         # Terraform and other IaC
    k8s/           # k8s Playground - Service Manifests and Cluster Config
    krakend/       # KrakenD Config & Plugins
    scripts/       # Misc Scripts
    mkdocs.yml     # Documentation configuration

## Documentation

Build the docker image in `docker/mkdocs`

```
docker build . -t mkdocs
```

Run the following command to start a server with live reload

```aiignore
docker run --rm -v "`pwd`:/app" -w /app -p 8000:8000 mkdocs mkdocs serve -a 0.0.0.0:8000
```

The docs will be served at http://localhost:8000
