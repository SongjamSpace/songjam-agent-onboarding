# 🎙️ Recommended Voice Models

A curated list of TTS models for Songjam agents, with quality ratings and setup instructions.

## Open Source (Recommended)

### Piper TTS ⭐⭐⭐⭐⭐
**Quality**: Excellent | **Speed**: Fast | **Cost**: Free

```bash
pip install piper-tts
```

**Best models:**
- `en_US-lessac-medium` - Natural female voice (recommended)
- `en_US-libritts-high` - High quality, multiple speakers
- `en_GB-alba-medium` - British accent

**Download models:**
```bash
wget https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx
wget https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json
```

**Usage:**
```bash
echo "Hello from Songjam" | piper --model en_US-lessac-medium --output_file output.wav
```

### Coqui TTS ⭐⭐⭐⭐
**Quality**: Excellent | **Speed**: Medium | **Cost**: Free

```bash
pip install TTS
```

**Best models:**
- `tts_models/en/ljspeech/tacotron2-DDC` - Classic, reliable
- `tts_models/en/vctk/vits` - Multiple speakers
- `tts_models/multilingual/multi-dataset/your_tts` - Voice cloning!

**Usage:**
```bash
tts --text "Hello from Songjam" \
    --model_name "tts_models/en/ljspeech/tacotron2-DDC" \
    --out_path output.wav
```

**Voice cloning:**
```bash
tts --text "Hello from Songjam" \
    --model_name "tts_models/multilingual/multi-dataset/your_tts" \
    --speaker_wav /path/to/your_voice_sample.wav \
    --out_path output.wav
```

### StyleTTS2 ⭐⭐⭐⭐⭐
**Quality**: State-of-the-art | **Speed**: Slow | **Cost**: Free

```bash
git clone https://github.com/yl4579/StyleTTS2.git
cd StyleTTS2
pip install -r requirements.txt
```

**Features:**
- Most natural-sounding open source TTS
- Emotion control
- Voice cloning with 10s of audio

**Usage:**
```python
from styletts2 import tts
audio = tts.inference("Hello from Songjam", 
                     emotion="happy",
                     speaker=0)
```

## Commercial

### ElevenLabs ⭐⭐⭐⭐⭐
**Quality**: Best available | **Speed**: Fast | **Cost**: $0.30/1k chars

```bash
npm install elevenlabs
```

**Pricing:**
- Free: 10k chars/month
- Creator: $5/mo - 30k chars
- Pro: $22/mo - 100k chars

**Usage:**
```javascript
const ElevenLabs = require('elevenlabs');

const audio = await ElevenLabs.generate({
  text: "Hello from Songjam",
  voice: "Bella",  // or your custom cloned voice
  model_id: "eleven_monolingual_v1"
});
```

**Custom voices:**
- Upload 1-2 min of clean audio
- Clone your own voice or create characters
- Use in API immediately

### Play.ht ⭐⭐⭐⭐
**Quality**: Very good | **Speed**: Fast | **Cost**: $19/mo

```bash
npm install playht
```

**Features:**
- Multiple voices (600+)
- Emotion control
- Voice cloning
- Real-time streaming

### Amazon Polly ⭐⭐⭐
**Quality**: Good | **Speed**: Fast | **Cost**: $4/1M chars

```bash
npm install @aws-sdk/client-polly
```

**Best voices:**
- Joanna (US female)
- Matthew (US male)
- Amy (British female)

## Comparison Table

| Model | Quality | Speed | Cost | Voice Clone | Emotion |
|-------|---------|-------|------|-------------|---------|
| Piper | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | Free | No | No |
| Coqui | ⭐⭐⭐⭐ | ⚡⚡ | Free | Yes | Limited |
| StyleTTS2 | ⭐⭐⭐⭐⭐ | ⚡ | Free | Yes | Yes |
| ElevenLabs | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | $$ | Yes | Yes |
| Play.ht | ⭐⭐⭐⭐ | ⚡⚡⚡ | $$ | Yes | Yes |
| Polly | ⭐⭐⭐ | ⚡⚡⚡ | $ | No | No |

## Recommendations by Use Case

**Best for getting started:**
→ Piper (free, fast, great quality)

**Best for quality:**
→ StyleTTS2 (open source) or ElevenLabs (commercial)

**Best for character/personality:**
→ ElevenLabs (emotion control + custom voices)

**Best for multilingual:**
→ Coqui YourTTS (100+ languages)

**Best for budget:**
→ Piper or Coqui (completely free)

**Best for voice cloning:**
→ StyleTTS2 (free) or ElevenLabs (paid, easier)

## Setup Example: Piper

Complete setup for a Songjam agent:

```bash
# Install Piper
pip install piper-tts

# Download a voice
mkdir -p ~/songjam-voices
cd ~/songjam-voices
wget https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx
wget https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json

# Test it
echo "Hello, I'm your Songjam agent!" | piper \
  --model ~/songjam-voices/en_US-lessac-medium.onnx \
  --output_file test.wav

# Play through BlackHole to your space
afplay -d "BlackHole 2ch" test.wav
```

## Performance Tips

**Reduce latency:**
```bash
# Use smaller models
piper --model en_US-lessac-low  # vs -medium or -high

# Pre-load model (Python)
model = piper.load_model("en_US-lessac-medium")
# Then generate quickly:
audio = model.synthesize("Text here")
```

**Batch generation:**
```bash
# Generate multiple phrases at once
cat phrases.txt | piper --model en_US-lessac-medium --output_dir outputs/
```

**Real-time streaming:**
Most models support streaming for lower latency:
```python
for chunk in tts.stream("Long text here..."):
    play_audio_chunk(chunk)  # Play while generating
```

---

**Next**: [Audio Routing](../docs/AUDIO_ROUTING.md) 🎵
