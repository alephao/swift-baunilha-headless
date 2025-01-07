#!/usr/local/env bash

dialog_checksum=$(shasum -a 256 Sources/BaunilhaHeadless/Resources/js/dialog.js | awk '{ print "dialog_"substr($1, 0, 8) }');
flyout_checksum=$(shasum -a 256 Sources/BaunilhaHeadless/Resources/js/flyout.js | awk '{ print "flyout_"substr($1, 0, 8) }');

mv Sources/BaunilhaHeadless/Resources/js/dialog.js Sources/BaunilhaHeadless/Resources/js/$dialog_checksum.js
mv Sources/BaunilhaHeadless/Resources/js/flyout.js Sources/BaunilhaHeadless/Resources/js/$flyout_checksum.js

cat << EOF > Sources/BaunilhaHeadless/Files.gen.swift
let _dialogFileName: String = "$dialog_checksum"
let _flyoutFileName: String = "$flyout_checksum"
