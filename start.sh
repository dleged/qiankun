#!/bin/bash

# 启动所有服务
./node_modules/.bin/npm-run-all --serial start:* &&

# 所有服务启动成功后输出信息
echo "All services have started successfully."
