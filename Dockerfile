FROM gitpod/workspace-full:latest
LABEL maintainer="contact@edukera.com"
RUN sudo apt-get update && sudo apt-get -y install wget netbase
RUN npm i @completium/completium-cli@0.0.3 -g
RUN completium-cli init
RUN completium-cli update binaries

