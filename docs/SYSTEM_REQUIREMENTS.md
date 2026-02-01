# System Requirements

## macOS (Fully Supported) ✅

**Minimum:**
- macOS Monterey (12.0) or later
- Apple Silicon (M1/M2/M3) or Intel
- 4GB RAM
- Node.js 18+

**Tested on:**
- macOS Sequoia 15.x (M-series)
- macOS Sonoma 14.x
- macOS Ventura 13.x

**Required Software:**
```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# BlackHole (virtual audio)
brew install blackhole-2ch

# FFmpeg (audio conversion)
brew install ffmpeg

# Node.js (if not installed)
brew install node@20
```

## Windows (Experimental) ⚠️

Windows support is experimental. The core concepts work, but scripts need adaptation.

**Requirements:**
- Windows 10/11
- [VB-Cable](https://vb-audio.com/Cable/) (virtual audio)
- [FFmpeg](https://ffmpeg.org/download.html)
- Node.js 18+

**Status:**
- Audio routing: Works with VB-Cable
- TTS: Requires alternative to macOS `say` command
- Scripts: Need Windows batch file equivalents

## Linux (Experimental) ⚠️

Linux support is experimental via PulseAudio.

**Requirements:**
- Ubuntu 20.04+ / Debian 11+ / Fedora 35+
- PulseAudio
- FFmpeg
- Node.js 18+
- espeak-ng (for Piper TTS)

**Setup:**
```bash
# Virtual audio sink
pactl load-module module-null-sink sink_name=songjam_sink

# FFmpeg
sudo apt install ffmpeg  # Debian/Ubuntu
sudo dnf install ffmpeg  # Fedora
```

**Status:**
- Audio routing: Works with PulseAudio
- TTS: Requires Piper or espeak
- Scripts: Need bash adaptations

---

## Why macOS First?

We're starting with macOS because:
1. **Native TTS**: Built-in `say` command with good quality
2. **Simple audio routing**: BlackHole works reliably
3. **Development platform**: Most AI agent builders use macOS

**Windows & Linux coming soon!** We're working on:
- Platform-specific setup scripts
- Alternative TTS options
- Full documentation for each OS

Want to help? Contribute platform-specific improvements via [GitHub](https://github.com/SongjamSpace/songjam-agent-onboarding)!
