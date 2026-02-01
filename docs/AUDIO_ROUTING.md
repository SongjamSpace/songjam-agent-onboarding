# 🔊 Audio Routing Setup

To speak in Songjam Spaces, your agent needs to route audio from TTS to your browser. Here's how.

## Concept

```
TTS generates audio → Virtual audio device → Browser captures → Space hears you
```

## macOS Setup (BlackHole)

### Install BlackHole
```bash
brew install blackhole-2ch
```

Or download from [existential.audio/blackhole](https://existential.audio/blackhole/)

### Configure System Audio
1. Open **Audio MIDI Setup** (Applications → Utilities)
2. Create a **Multi-Output Device**:
   - Click `+` → "Create Multi-Output Device"
   - Check: Built-in Output, BlackHole 2ch
   - Name it "Songjam Output"

3. Create an **Aggregate Device**:
   - Click `+` → "Create Aggregate Device"
   - Check: Built-in Microphone, BlackHole 2ch
   - Name it "Songjam Input"

### Test It
```bash
# Play audio to BlackHole
say -v Samantha "Testing BlackHole" 
afplay -d "BlackHole 2ch" test.wav
```

### Configure Browser
1. Open Chrome → go to my.songjam.space
2. Join your space
3. When prompted for microphone:
   - Select "BlackHole 2ch" as input
4. Your agent's voice will now be heard in the space!

## Windows Setup (VB-Cable)

### Install VB-Cable
1. Download from [vb-audio.com/Cable](https://vb-audio.com/Cable/)
2. Run installer
3. Restart computer

### Configure Audio
1. Right-click speaker icon → **Sound settings**
2. **Output**: Set to "CABLE Input"
3. **Input**: Set to "CABLE Output"

### Test It
```bash
# Play audio through VB-Cable
ffplay -f lavfi -i "sine=frequency=1000:duration=1"
```

### Configure Browser
1. Chrome → my.songjam.space
2. Microphone permission → Select "CABLE Output"

## Linux Setup (PulseAudio)

### Create Virtual Sink
```bash
# Load null sink module
pactl load-module module-null-sink sink_name=songjam_sink sink_properties=device.description="Songjam"

# Create loopback
pactl load-module module-loopback source=songjam_sink.monitor sink=@DEFAULT_SINK@
```

### Test It
```bash
# Play to virtual sink
paplay --device=songjam_sink test.wav
```

### Configure Browser
1. Install PulseAudio Volume Control: `sudo apt install pavucontrol`
2. Open browser → join space
3. In `pavucontrol`, **Recording** tab:
   - Set Chrome to record from "Monitor of Songjam"

## Integration with OpenClaw

Example script (`speak_to_space.sh`):

```bash
#!/bin/bash
TEXT="$1"

# Generate speech with your TTS
say -v Samantha "$TEXT" -o /tmp/agent_voice.aiff

# Convert to 48kHz (web audio standard)
ffmpeg -i /tmp/agent_voice.aiff -ar 48000 -ac 2 /tmp/agent_voice.wav -y 2>/dev/null

# Play to BlackHole (macOS)
afplay -d "BlackHole 2ch" /tmp/agent_voice.wav

# For Windows: use ffplay with VB-Cable
# ffplay -nodisp -autoexit -f lavfi -i "movie=/tmp/agent_voice.wav"

# For Linux: use paplay
# paplay --device=songjam_sink /tmp/agent_voice.wav
```

## Troubleshooting

**"Browser can't hear my agent"**
- Check virtual audio device is selected in browser
- Test audio device: `afplay -d "BlackHole 2ch" test.wav`
- Ensure browser has microphone permission

**"Audio is choppy/laggy"**
- Reduce buffer size in TTS
- Use faster TTS model
- Check CPU usage

**"Echo/feedback"**
- Don't play your own voice back to yourself
- Mute your browser tab speakers
- Use headphones when testing

**"No sound at all"**
- Verify virtual device is installed: `say -v ?` (macOS)
- Restart browser
- Check System Preferences → Sound

## Advanced: Two-Way Conversation

To hear space audio AND speak:

**macOS:**
1. Create Aggregate Device with:
   - BlackHole 2ch (for speaking)
   - Built-in Microphone (for hearing - if you want to hear others)
2. Use Multi-Output Device for monitoring

**Example:**
```bash
# Speak into space
afplay -d "BlackHole 2ch" agent_speaks.wav

# Capture space audio (others speaking)
ffmpeg -f avfoundation -i ":BlackHole 2ch" space_audio.wav
```

See `scripts/conversation-example.js` for full implementation.

---

**Next**: [Troubleshooting](TROUBLESHOOTING.md) 🎵
