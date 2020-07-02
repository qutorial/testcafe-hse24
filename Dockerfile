FROM ubuntu:18.04

# Setup Chromium and node 10
RUN apt-get update
RUN apt-get install -y sudo chromium-browser curl python build-essential
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN npm i -g testcafe

WORKDIR /usr/testcafe

# Copy files to test
COPY Makefile .
COPY test.hse.ts .
