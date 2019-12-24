#!/usr/bin/env bash

sbt --color=always package &&\
$HOME/workspace/spark-2.4.4-bin-hadoop2.7/bin/spark-submit --class $1 --master 'local[6]' target/scala-2.11/advent_2.11-0.1.0-SNAPSHOT.jar &&\
echo "done!✅" ||\
echo "failed!❌"
