## Setup

1. Run `docker-compose build`. This will pull the base images, and install image dependencies.

2. Run `docker-compose run web npm install`. This will install the `package.json` dependencies in the `app` sub-folder. Since this folder is mounted into the Docker image as a volume, any changes made in the image or on your local file system are synced.

## Start

Run `docker-compose up` to start the container. The app should then be running at http://localhost:3000.
