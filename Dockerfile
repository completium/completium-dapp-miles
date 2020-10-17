FROM amd64/ubuntu
USER root
LABEL maintainer="contact@edukera.com"
RUN apt-get update && apt-get -y install wget netbase
RUN wget -q https://github.com/serokell/tezos-packaging/releases/latest/download/tezos-client -P /usr/local/bin
RUN wget -q https://github.com/edukera/archetype-lang/releases/download/1.2.1/archetype-x64-linux -P /usr/local/bin
RUN ln -s /usr/local/bin/archetype-x64-linux /usr/local/bin/archetype
RUN chmod +x /usr/local/bin/archetype-x64-linux /usr/local/bin/tezos-client