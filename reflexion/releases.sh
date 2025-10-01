#! /usr/bin/env bash

FILE=releases


[ -f $FILE ]  &&
semver=$( grep "^#" $FILE | tail -n 1 | grep -o -P "(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?" ) &&
echo -e  "\n$( date  "+# v$semver (%Y/%m/%d)" )" >> $FILE

