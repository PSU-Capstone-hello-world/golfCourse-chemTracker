#!/bin/bash
set -e
yum update -y
pm2 update
yum install -y nodejs