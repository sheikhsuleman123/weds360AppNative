#!/bin/bash

./gradlew ${1:-installDevDebug} --stacktrace && adb shell am start -n com.plus360.weds360/host.exp.exponent.MainActivity
