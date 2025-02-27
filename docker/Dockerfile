FROM python:3.13-slim-bookworm

ENV VIRTUAL_ENV=/venv \
    POETRY_VERSION=2.0.1


RUN pip install "poetry==$POETRY_VERSION"

COPY poetry.lock pyproject.toml ./

RUN python3 -m venv $VIRTUAL_ENV

ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN poetry install --no-interaction --no-ansi --without dev

WORKDIR /usr/src/app

COPY backend .
