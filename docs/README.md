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

## Getting Started

### Backend

If you don't already have poetry installed, install it using the instructions found [here](https://python-poetry.org/docs/).

If you want to watch me struggle getting poetry upgraded from 1.8 to 2.0 [click here](https://youtube.com/live/dguKhVizZ90?feature=share)

- Run `poetry install`
- Run `poetry shell` - If you are using poetry version 2.X+ be sure to have the [poetry plugin shell](https://github.com/python-poetry/poetry-plugin-shell) installed.
- `cd backend`
- `python manage.py runserver 0.0.0.0:8000`
- API Server should be running at http://localhost:8000 in your browser

### Frontend

The frontend is built with [Expo](https://expo.dev).

### Documentation

After following the above steps to install poetry and activating the virtual environment, run `mkdocs serve`.

The docs will be served at http://localhost:8000

### Commands

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
