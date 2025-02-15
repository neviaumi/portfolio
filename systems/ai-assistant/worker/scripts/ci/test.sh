#!/bin/bash
set -ex
cd ./worker
pdm run black --check ./src