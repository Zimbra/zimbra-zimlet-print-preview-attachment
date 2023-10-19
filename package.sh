#!/bin/bash

npm install
zimlet build
zimlet package -v 0.0.1 --zimbraXVersion ">=2.0.0" -n "zimbra-zimlet-print-preview-attachment" --desc "Displays a link to show a print preview for attachments" -l "Print preview attachment"
