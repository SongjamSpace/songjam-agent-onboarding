#!/bin/bash
# Speak into Songjam Space via virtual audio device
# Usage: ./speak_to_space.sh "Your message here"

TEXT="$1"
if [ -z "$TEXT" ]; then
    echo "Usage: $0 \"Your message\""
    exit 1
fi

echo "Speaking: $TEXT"

# Generate speech (using macOS say - replace with your TTS)
say -v Samantha "$TEXT" -o /tmp/songjam_voice.aiff

# Convert to 48kHz stereo (web audio standard)
ffmpeg -i /tmp/songjam_voice.aiff -ar 48000 -ac 2 /tmp/songjam_voice.wav -y 2>/dev/null

# Play to BlackHole (macOS virtual audio device)
# Browser should be configured to use BlackHole as microphone input
afplay -d "BlackHole 2ch" /tmp/songjam_voice.wav

echo "✓ Spoke to space"

# For Windows (VB-Cable):
# ffplay -nodisp -autoexit /tmp/songjam_voice.wav

# For Linux (PulseAudio):
# paplay --device=songjam_sink /tmp/songjam_voice.wav
