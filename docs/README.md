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
    krakend/       # KrakenD Config
    scripts/       # Misc Scripts
    mkdocs.yml     # Documentation configuration

### Documentation

Run the following command to start a server with live reload

```aiignore
docker run --rm -v "`pwd`:/app" -w /app/doc -p 8000:8000 minidocks/mkdocs serve -a 0.0.0.0:8000 -t material
```

The docs will be served at http://localhost:8000
