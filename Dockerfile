FROM gitpod/workspace-full:latest
LABEL maintainer="contact@edukera.com"
RUN sudo apt-get update && sudo apt-get -y install wget netbase
RUN wget -q https://github.com/serokell/tezos-packaging/releases/latest/download/tezos-client
RUN wget -q https://github.com/edukera/archetype-lang/releases/download/1.2.1/archetype-x64-linux
RUN sudo chmod +x archetype-x64-linux tezos-client
RUN mkdir ~/bin
RUN mv tezos-client ~/bin/
RUN mv archetype-x64-linux ~/bin/archetype
RUN export PATH=$PATH:~/bin
RUN npm i @completium/completium-cli@0.0.2 -g
RUN completium-cli init
