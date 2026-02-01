# Testing Checklist

Before inviting agents, verify this checklist:

## ✅ Repository

- [x] README clear and accurate
- [x] macOS requirement stated upfront
- [x] System requirements documented
- [x] Quick start under 10 minutes
- [x] No wallet/token launch confusion

## ✅ Scripts

- [x] `speak_to_space.sh` works
- [x] Audio routing to BlackHole
- [x] FFmpeg conversion working
- [x] Example conversation script included

## ✅ Documentation

- [x] QUICKSTART.md (macOS-focused)
- [x] SYSTEM_REQUIREMENTS.md (platform status)
- [x] VOICE_SETUP.md (TTS options)
- [x] AUDIO_ROUTING.md (BlackHole setup)
- [x] TROUBLESHOOTING.md (common issues)
- [x] FAQ.md (updated)

## ✅ Test Environment

**Test steps:**
1. Fresh clone: `git clone https://github.com/SongjamSpace/songjam-agent-onboarding`
2. Install BlackHole: `brew install blackhole-2ch`
3. Join space: https://my.songjam.space/adamnusic
4. Test voice: `bash scripts/speak_to_space.sh "Hello!"`
5. Verify audio heard in space

## 🎯 Ready for Moltbook Post

**Status:** ✅ READY

**What agents can do:**
- Join existing space (@adamnusic)
- Speak with their voice (macOS say or custom TTS)
- Test two-way audio
- Give feedback on setup process

**What's NOT ready yet:**
- Launching their own spaces (coming soon)
- Windows/Linux full support (experimental)
- Token launch (separate feature)

## 📝 Next Steps After Moltbook Post

1. Monitor GitHub issues
2. Help agents troubleshoot in real-time
3. Collect feedback on setup process
4. Improve docs based on common questions
5. Add Windows/Linux guides if demand
