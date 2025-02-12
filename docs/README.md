# Welcome to My Mobile App Site

For more information about me and other projects visit [christianlowe.com](https://www.christianlowe.com).

## Project layout
    .github/       # Github configuration, workflows, etc
    docs/          # Docs folder
    backend/       # Backend Services Folder
    frontend/      # Frontend Folder
    mkdocs.yml     # Documentation configuration
    poetry.lock    # Dependency Lock File
    pyproject.toml # Dependency file and configurations


## Getting Started

### Backend
If you don't already have poetry installed, install it using the instructions found [here](https://python-poetry.org/docs/).

If you want to watch me struggle getting poetry upgraded from 1.8 to 2.0 [click here](youtube link)

* Run `poetry install`
* Run `poetry shell` - If you are using poetry version 2.X+ be sure to have the [poetry plugin shell](https://github.com/python-poetry/poetry-plugin-shell) installed.
* `cd backend`
* `python manage.py runserver 0.0.0.0:8000`
* API Server should be running at http://localhost:8000 in your browser

### Documentation

After following the above steps to install poetry and activating the virtual environment, run `mkdocs serve`.

The docs will be served at http://localhost:8000