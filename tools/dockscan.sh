#!/bin/bash

echo "Scanning your macOS dock..."
echo

defaults read com.apple.dock persistent-apps \
  | grep \
    -e 'file:' \
    -e 'file-label' \
  | sed 's/^ *.*= //g' \
  | sed 's/^"//g' \
  | sed 's/"*;$//g'
