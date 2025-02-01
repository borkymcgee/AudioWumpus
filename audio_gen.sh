#!/bin/bash

cd audio
oldifs=$IFS
IFS="	"

while read FNAME LINE; do
        echo "file=$FNAME, words=$LINE"
        echo "$LINE" | text2wave > "$FNAME.wav"
        #vlc "$FNAME.wav"
done < ../tts_lines

IFS=$oldifs
cd ..
