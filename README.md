# Testcafe tests for HSE24 de

The tests are dockerized.

They are testing the basic functionality of hse24.de.


## Usage

First of all you'll need to install everything.
Docker is expected. 

Python3 and Python3 PIP are expected on your machine to watch
the tests.

Run `make watch` to build the image and run the test inside container periodically.

If something gets broken the watch script will play a sound.

## Installation

For running the test, install Docker.

Then run `make install` to install everything needed to watch the tests.

On Ubuntu run `make install-ubuntu-prerequisites` first.

## Development

Install everything first.

Then run `make install-dev` to get the types and the tools.

Use `make test` and `make test-visual` to run the tests on the local machine.
