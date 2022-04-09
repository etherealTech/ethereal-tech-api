#!/bin/sh -e

EXPORT_PATH='service-account.json'

if [ -f "$EXPORT_PATH" ]; then
    echo "File: $EXPORT_PATH is already existed!"
else
    echo "Download URL: ${FIREBASE_CREDENTIAL_URL:?'requried argument[0]: FIREBASE_CREDENTIAL_URL'} >> $EXOPRT_PATH"
    curl -L "$FIREBASE_CREDENTIAL_URL" >"$EXPORT_PATH"
    echo "Done!"
fi

exit
