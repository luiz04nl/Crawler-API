FROM buildkite/puppeteer:v1.15.0 AS debug

RUN apt-get update
RUN apt-get install git -y

EXPOSE 3000

ENV SHELL /bin/bash